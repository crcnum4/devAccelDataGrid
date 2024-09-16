import { FC } from 'react'
import { ColumnOptions } from '../types/Grid'
import React from 'react'
import { SLATE } from '../types'

type Props = {
  value: string
  columnOptions: ColumnOptions
}

const DataCell: FC<Props> = ({ value, columnOptions }) => {
  const { width = '180px' } = columnOptions

  return (
    <div
      className='data-cell'
      style={{
        padding: '0.5rem',
        minWidth: width,
        maxWidth: width,
        width,
        border: `1px solid ${SLATE}`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </div>
  )
}

export default DataCell
