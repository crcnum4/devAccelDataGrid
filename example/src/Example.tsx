import React, { useState } from 'react'
import { FC } from 'react'
import { data } from './sampleData'
import { ColumnOptions, GridData } from 'devaccel-data-grid'
import DataGrid from 'devaccel-data-grid/dist/esm/components/DataGrid'

const Example: FC = () => {
  const [tableData] = useState<GridData[]>(data)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [locked, setLocked] = useState<Set<string>>(new Set(['id']))

  const handleLock = (field: string) => {
    if (locked.has(field)) {
      locked.delete(field)
      setLocked(new Set(locked))
    } else {
      setLocked(new Set(locked).add(field))
    }
  }

  const handleHide = (field: string): void => {
    setHidden(new Set(hidden).add(field))
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
      isHidden: hidden.has('first_name'),
      onLockClick: handleLock,
      isLocked: locked.has('first_name'),
    },
    {
      field: 'last_name',
      canLock: true,
      onLockClick: handleLock,
      isLocked: locked.has('last_name'),
    },
    {
      field: 'full_name',
      header: 'Full Name',
      render: data => `${data.first_name} ${data.last_name}`,
      canHide: true,
      isHidden: hidden.has('full_name'),
      onHideClick: handleHide,
    },
    {
      field: 'email',
      canLock: true,
      canHide: true,
      onHideClick: handleHide,
      isHidden: hidden.has('email'),
      onLockClick: handleLock,
      isLocked: locked.has('email'),
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
    const i = tableOptions.findIndex(option => option.field === field)
    tableOptions[i] = {
      ...tableOptions[i],
      [key]: value,
    }
    setTableOption(tableOptions)
  }

  return (
    <div style={{ margin: 'auto', width: '75vw' }}>
      <DataGrid tableData={tableData} columnOptionsList={tableOptions} stickyHeaders />
    </div>
  )
}

export default Example
