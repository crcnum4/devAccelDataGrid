import React, { useState } from 'react'
import { FC } from 'react'
import { data } from './sampleData'
import { ColumnOptions, GridData } from 'devaccel-data-grid'
import DataGrid from 'devaccel-data-grid/dist/esm/components/DataGrid'

const Example: FC = () => {
  const [tableData] = useState<GridData[]>(data)

  const handleLock = (field: string, isLocked: boolean) => {
    updateOptions(field, 'isLocked', !isLocked)
  }

  const handleHide = (field: string): void => {
    updateOptions(field, 'isHidden', true)
  }

  const [tableOptions, setTableOption] = useState<ColumnOptions[]>([
    {
      field: 'id',
      header: 'ID',
      isLocked: true,
    },
    {
      field: 'first_name',
      canLock: true,
      canHide: true,
      onHideClick: handleHide,
      isHidden: false,
      onLockClick: handleLock,
      isLocked: false,
    },
    {
      field: 'last_name',
      canLock: true,
      onLockClick: handleLock,
      isLocked: false,
    },
    {
      field: 'full_name',
      header: 'Full Name',
      render: data => `${data.first_name} ${data.last_name}`,
      canHide: true,
      isHidden: false,
      onHideClick: handleHide,
    },
    {
      field: 'email',
      canLock: true,
      canHide: true,
      onHideClick: handleHide,
      isHidden: false,
      onLockClick: handleLock,
      isLocked: false,
    },
    {
      field: 'gender',
    },
    {
      field: 'ip_address',
      header: 'IP Address',
      headerOptions: {
        style: { backgroundColor: 'orange' },
      },
    },
    {
      field: 'Notes',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateOptions = (field: string, key: string, value: any) => {
    console.log(field, key, value)
    const i = tableOptions.findIndex(option => option.field === field)
    tableOptions[i] = {
      ...tableOptions[i],
      [key]: value,
    }
    setTableOption(tableOptions)
  }

  return (
    <div style={{ margin: 'auto', width: '75vw' }}>
      <DataGrid tableData={tableData} columnOptionsList={tableOptions} stickyHeaders onChange={updateOptions} />
    </div>
  )
}

export default Example
