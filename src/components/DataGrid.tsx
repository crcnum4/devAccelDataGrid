import { CSSProperties, FC, HTMLAttributes } from 'react'
import { ColumnOptions, GridContent } from '../types/Grid'
import React from 'react'
import Header from './Header'
import { LIGHT_BLUE, SLATE } from '../types/colors'
import DataRow from './DataRow'

type Props = {
  tableData: GridContent
  columnOptionsList: ColumnOptions[]
  stickyHeaders?: boolean
  tableProps: HTMLAttributes<HTMLDivElement>
}

const DataGrid: FC<Props> = (props) => {
  //todo extract colOptions to locked and unlocked

  const renderHeaders = () => {
    const defaultStyle: CSSProperties = {
      height: '30px',
      border: `1px solid ${SLATE}`,
      fontWeight: 'bold',
      color: '111111',
      backgroundColor: `${LIGHT_BLUE}`,
    }

    const StickyStyle: CSSProperties = {
      position: 'relative',
      top: 0,
      zIndex: 100,
      ...defaultStyle,
    }

    return (
      <div id='grid-header' style={props.stickyHeaders ? StickyStyle : defaultStyle}>
        {props.columnOptionsList.map((option) => (
          <Header key={`header_${option.field}`} options={option} />
        ))}
      </div>
    )
  }

  const renderContent = () => {
    return props.tableData.map((data) => (
      <DataRow key={data.id} data={data} columOptionsList={props.columnOptionsList} />
    ))
  }

  return (
    <div
      id='grid-wapper'
      style={{
        width: '100%',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
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