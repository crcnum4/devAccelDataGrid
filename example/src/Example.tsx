import React, { useState } from 'react'
import { FC } from 'react'
import { data } from './sampleData'
import { ColumnOptions, DateFilter, DG_DATA_TYPES, FilterOptions, GridData, NumberFilter } from 'devaccel-data-grid'
import DataGrid from 'devaccel-data-grid/dist/esm/components/DataGrid'

const Example: FC = () => {
  const [tableData] = useState<GridData[]>(data)

  const handleLock = (field: string, isLocked?: boolean) => {
    updateOptions(field, 'isLocked', !isLocked)
  }

  const handleHide = (field: string): void => {
    updateOptions(field, 'isHidden', true)
  }

  const handleFilterChange = (newValue: string | DateFilter | NumberFilter | null, field: string) => {
    switch (filterOptions[field].formOption.type) {
      case DG_DATA_TYPES.String:
      case DG_DATA_TYPES.Select:
        setFilterOptions({
          ...filterOptions,
          [field]: {
            ...filterOptions[field],
            formOption: {
              ...filterOptions[field].formOption,
              currentValue: newValue as string,
            },
          },
        })
        break
      case DG_DATA_TYPES.Boolean:
        setFilterOptions({
          ...filterOptions,
          [field]: {
            ...filterOptions[field],
            formOption: {
              ...filterOptions[field].formOption,
              currentValue: newValue === 'Yes' || newValue === 'No' ? newValue : null,
            },
          },
        })
        break
      case DG_DATA_TYPES.Date:
        setFilterOptions({
          ...filterOptions,
          [field]: {
            ...filterOptions[field],
            formOption: {
              ...filterOptions[field].formOption,
              currentValue: newValue as DateFilter,
            },
          },
        })
        break
      case DG_DATA_TYPES.Number:
        setFilterOptions({
          ...filterOptions,
          [field]: {
            ...filterOptions[field],
            formOption: {
              ...filterOptions[field].formOption,
              currentValue: newValue as NumberFilter,
            },
          },
        })
        break
    }
  }
  const [tableOptions, setTableOptions] = useState<ColumnOptions[]>([
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

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    first_name: {
      field: 'first_name',
      onChange: handleFilterChange,
      formOption: {
        type: DG_DATA_TYPES.String,
        currentValue: '',
      },
    },
    gender: {
      field: 'gender',
      onChange: handleFilterChange,
      formOption: {
        type: DG_DATA_TYPES.Select,
        currentValue: '',
        options: [
          { value: 'Male', text: 'Male' },
          { value: 'Female', text: 'Female' },
        ],
      },
    },
  })

  const updateOptions = (field: string, key: string, value: any) => {
    const i = tableOptions.findIndex(option => option.field === field)
    if (i === -1) {
      throw new Error('Invalid Id')
    }
    //because of array spread options we need previousState
    setTableOptions(previousOptions => {
      const newOptions = [...previousOptions]
      newOptions[i] = {
        ...previousOptions[i],
        [key]: value,
      }
      return newOptions
    })
  }

  return (
    <div style={{ margin: 'auto', width: '75vw' }}>
      <DataGrid tableData={tableData} columnOptionsList={tableOptions} stickyHeaders onChange={updateOptions} />
    </div>
  )
}

export default Example
