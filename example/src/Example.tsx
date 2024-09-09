import React, { useState } from 'react'
import { FC } from 'react'
import { data } from './sampleData'
import { ColumnOptions, GridData } from 'devaccel-data-grid'
import DataGrid from 'devaccel-data-grid/dist/esm/components/DataGrid'

const Example: FC = () => {
  const [tableData] = useState<GridData[]>(data)
  const tableOptions: ColumnOptions[] = [
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'first_name',
    },
    {
      field: 'last_name',
    },
    {
      field: 'email',
    },
    {
      field: 'gender',
    },
    {
      field: 'ip_address',
      header: 'IP Address',
    },
    {
      field: 'Notes',
    },
  ]

  return (
    <div>
      <DataGrid
        tableData={tableData}
        columnOptionsList={tableOptions}
        tableProps={{}}
      />
    </div>
  )
}

export default Example
