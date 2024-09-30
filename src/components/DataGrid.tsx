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

type ResizeObj =
  | {
      field: string
      startingPos: number
    }
  | {
      field: null
      startingPos: null
    }

const DataGrid: FC<Props> = props => {
  const [resizeObj, setResizeObj] = useState<ResizeObj>({ field: null, startingPos: null })
  const lockedRef = useRef<HTMLDivElement>(null)
  const unlockedRef = useRef<HTMLDivElement>(null)
  const masterRef = useRef<HTMLDivElement>(null)

  const startResizing = (field: string, position: number) => {
    setResizeObj({ field, startingPos: position })
  }

  const stopResizing = () => {
    setResizeObj({ field: null, startingPos: null })
  }

  const resizing = (e: MouseEvent) => {
    if (resizeObj.field === null) return
    if (!props.onChange) {
      throw new Error('Missing change prop')
    }
    const newWidth = e.clientX - resizeObj.startingPos
    props.onChange(resizeObj.field, 'width', newWidth)
  }

  useEffect(() => {
    const lTable = lockedRef.current
    const ulTable = unlockedRef.current
    const mRef = masterRef.current

    if (!lTable || !ulTable || !mRef) return

    const handleScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      target.scrollTop = source.scrollTop
    }

    lTable.addEventListener('scroll', () => handleScroll(lTable, ulTable))
    ulTable.addEventListener('scroll', () => handleScroll(ulTable, lTable))
    mRef.addEventListener('mouseup', stopResizing)
    mRef.addEventListener('mousemove', resizing)

    return () => {
      lTable.removeEventListener('scroll', () => handleScroll(lTable, ulTable))
      ulTable.removeEventListener('scroll', () => handleScroll(ulTable, lTable))
      mRef.removeEventListener('mouseup', stopResizing)
      mRef.removeEventListener('mousemove', resizing)
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
