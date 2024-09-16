import { FC, HTMLAttributes } from 'react'
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
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '65vh',
      }}
    >
      <div
        className='locked-wrapper'
        style={{
          width: 'auto',
          maxWidth: '55vw',
          display: 'flex',
          flexDirection: 'column',
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
