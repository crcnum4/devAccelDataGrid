import React, { FC } from 'react'
import { ColumnOptions, GridData } from '../types/Grid'
import DataCell from './DataCell'

type Props = {
  data: GridData
  columOptionsList: ColumnOptions[]
}

const DataRow: FC<Props> = ({ data, columOptionsList }) => {
  const renderCells = (filter: (o: ColumnOptions) => boolean) => {
    return columOptionsList
      .filter(filter)
      .map(option => (
        <DataCell
          key={`${data['id']}_${option.field}`}
          value={option.render ? option.render(data) : option.formatter ? option.formatter(data) : data[option.field]}
          columnOptions={option}
        />
      ))
  }

  return (
    <div
      className='data-row'
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {renderCells(option => !option.isHidden)}
    </div>
  )
}

export default DataRow
