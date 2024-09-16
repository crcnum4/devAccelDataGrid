import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { ColumnOptions, GridContent } from '../types/Grid'
import React from 'react'
import DataRow from './DataRow'
import DataHeader from './DataHeader'

type Props = {
  tableData: GridContent
  columnOptionsList: ColumnOptions[]
  stickyHeaders?: boolean
  tableProps?: HTMLAttributes<HTMLDivElement>
}

const DataGrid: FC<Props> = props => {
  const lockedRef = useRef<HTMLDivElement>(null)
  const unlockedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lTable = lockedRef.current
    const ulTable = unlockedRef.current

    if (!lTable || !ulTable) return

    const handleScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      target.scrollTop = source.scrollTop
    }

    lTable.addEventListener('scroll', () => handleScroll(lTable, ulTable))
    ulTable.addEventListener('scroll', () => handleScroll(ulTable, lTable))

    return () => {
      lTable.removeEventListener('scroll', () => handleScroll(lTable, ulTable))
      ulTable.removeEventListener('scroll', () => handleScroll(ulTable, lTable))
    }
  })

  //todo extract colOptions to locked and unlocked

  const renderContent = (filter: (o: ColumnOptions) => unknown) => {
    return props.tableData.map(data => (
      <DataRow key={data.id} data={data} columOptionsList={props.columnOptionsList.filter(filter)} />
    ))
  }

  return (
    <div
      className='grid-wrapper'
      style={{
        width: '100%',
        maxWidth: '90vw',
        overflowX: 'hidden',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '65vh',
      }}
    >
      <div
        className='locked-wrapper'
        ref={lockedRef}
        style={{
          width: 'auto',
          maxWidth: '55vw',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'scroll',
        }}
      >
        <DataHeader
          stickyHeaders={props.stickyHeaders}
          columnOptionsList={props.columnOptionsList.filter(option => option.isLocked)}
        />
        <div className='grid-body' style={{ display: 'flex', flexDirection: 'column' }}>
          {renderContent(option => option.isLocked)}
        </div>
      </div>
      <div
        className='unlocked-wapper'
        ref={unlockedRef}
        style={{
          width: '100%',
          maxWidth: '90vw',
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          // maxHeight: '65vh',
        }}
      >
        <DataHeader
          stickyHeaders={props.stickyHeaders}
          columnOptionsList={props.columnOptionsList.filter(option => !option.isLocked)}
        />
        {/* render Filters */}
        {/* renderBody */}
        <div className='grid-body' style={{ display: 'flex', flexDirection: 'column' }}>
          {renderContent(option => !option.isLocked)}
        </div>
      </div>
    </div>
  )
}

export default DataGrid
