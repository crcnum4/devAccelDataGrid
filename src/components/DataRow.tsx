import React, { FC } from 'react'
import { ColumnOptions, GridData } from '../types/Grid'
import { SLATE } from '../types/colors'
import DataCell from './DataCell'

type Props = {
  data: GridData
  columOptionsList: ColumnOptions[]
}

const DataRow: FC<Props> = ({ data, columOptionsList }) => {
  const renderCells = () => {
    return columOptionsList.map((option) => (
      <DataCell
        key={`${data['id']}_${option.field}`}
        value={
          option.render
            ? option.render(data[option.field])
            : option.formatter
              ? option.formatter(data[option.field])
              : data[option.field]
        }
        columnOptions={option}
      />
    ))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '30px',
        border: `1 px ${SLATE}`,
      }}
    >
      {renderCells()}
    </div>
  )
}

export default DataRow
