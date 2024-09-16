import { CSSProperties, FC } from 'react'
import { ColumnOptions } from '../types'
import React from 'react'
import Header from './Header'

type Props = {
  columnOptionsList: ColumnOptions[]
  stickyHeaders?: boolean
}

const DataHeader: FC<Props> = props => {
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
        .filter(option => !option.isHidden)
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

export default DataHeader
