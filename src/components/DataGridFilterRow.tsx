import { FC } from 'react'
import { ColumnOptions, FilterOptions } from '../types'
import React from 'react'
import EmptyCell from './EmptyCell'
import DataGridFilter from './DataGridFilter'

type Props = {
  columnOptionsList: ColumnOptions[]
  filterOption: FilterOptions
}

const DataGridFilterRow: FC<Props> = props => {
  const renderFilters = (filter: (o: ColumnOptions) => boolean) => {
    return props.columnOptionsList.filter(filter).map(option => {
      if (!props.filterOption[option.field]) {
        return <EmptyCell columnOptions={option} key={option.field} />
      }
      return (
        <DataGridFilter key={option.field} filterOption={props.filterOption[option.field]} columnOptions={option} />
      )
    })
  }

  return (
    <div
      className='data-row'
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {renderFilters(option => !option.isHidden)}
    </div>
  )
}

export default DataGridFilterRow
