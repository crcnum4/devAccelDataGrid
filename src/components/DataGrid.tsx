import { CSSProperties, FC, HTMLAttributes } from 'react'
import { ColumnOptions, GridContent } from '../types/Grid'
import React from 'react'
import Header from './Header'
import DataRow from './DataRow'

type Props = {
  tableData: GridContent
  columnOptionsList: ColumnOptions[]
  stickyHeaders?: boolean
  tableProps?: HTMLAttributes<HTMLDivElement>
}

const DataGrid: FC<Props> = props => {
  //todo extract colOptions to locked and unlocked

  const renderHeaders = () => {
    const defaultStyle: CSSProperties = {
      fontWeight: 'bold',
      color: '111111',
      display: 'flex',
      flexDirection: 'row',
    }

    const StickyStyle: CSSProperties = {
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }

    const content = (
      <div className='grid-header' style={defaultStyle}>
        {props.columnOptionsList
          .filter(option => {
            if (option.isHidden) return false
            return option.isLocked
          })
          .map(option => (
            <Header key={`header_${option.field}`} options={option} />
          ))}
        {props.columnOptionsList
          .filter(option => {
            if (option.isHidden) return false
            return !option.isLocked
          })
          .map(option => (
            <Header key={`header_${option.field}`} options={option} />
          ))}
      </div>
    )

    return props.stickyHeaders ? (
      <div className='sticky-wrapper' style={StickyStyle}>
        {content}
      </div>
    ) : (
      content
    )
  }

  const renderContent = () => {
    return props.tableData.map(data => <DataRow key={data.id} data={data} columOptionsList={props.columnOptionsList} />)
  }

  return (
    <div
      className='grid-wapper'
      style={{
        width: '100%',
        maxWidth: '90vw',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '65vh',
      }}
    >
      {renderHeaders()}
      {/* render Filters */}
      {/* renderBody */}
      <div id='grid-body' style={{ display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </div>
    </div>
  )
}

export default DataGrid
