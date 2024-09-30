import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { ColumnOptions, GridContent, onChangeFunc } from '../types/Grid'
import React from 'react'
import DataRow from './DataRow'
import DataHeader from './DataHeader'
import '../styles/main.css'

type Props = {
  tableData: GridContent
  columnOptionsList: ColumnOptions[]
  stickyHeaders?: boolean
  tableProps?: HTMLAttributes<HTMLDivElement>
  onChange?: onChangeFunc
}

const minWidth = 25

const DataGrid: FC<Props> = props => {
  const lockedRef = useRef<HTMLDivElement>(null)
  const unlockedRef = useRef<HTMLDivElement>(null)
  const masterRef = useRef<HTMLDivElement>(null)
  const [resizeObj, setResizeObj] = useState<{ index: null; field: null } | { index: number; field: string }>({
    index: null,
    field: null,
  })

  const startResizing = (position: number, field: string) => {
    setResizeObj({ index: position, field })
  }

  const stopResizing = () => {
    setResizeObj({ index: null, field: null })
  }

  const resizing = (e: MouseEvent) => {
    console.log('m')
    if (resizeObj.index !== null) {
      if (!props.onChange) {
        throw new Error('Missing change prop')
      }
      console.log(e.clientX, '-', resizeObj.index)
      const newWidth = e.clientX - resizeObj.index
      props.onChange(resizeObj.field, 'width', newWidth < minWidth ? minWidth : newWidth)
    }
  }

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

  useEffect(() => {
    const mref = masterRef.current
    if (!mref) return

    mref.addEventListener('mousemove', resizing)
    mref.addEventListener('mouseup', stopResizing)

    return () => {
      mref.removeEventListener('mousemove', resizing)
      mref.removeEventListener('mouseup', stopResizing)
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
        className='locked-wrapper hidden-scroll'
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
          onResize={startResizing}
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
          onChange={props.onChange}
          onResize={startResizing}
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
