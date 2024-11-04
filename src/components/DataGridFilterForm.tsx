import { CSSProperties, ChangeEvent, FC, useState } from 'react'
import {
  ColumnOptions,
  DG_DATA_TYPES,
  DateFilter,
  DateFilterOptions,
  FilterOption,
  NumberFilter,
  NumberFilterOptions,
} from '../types'
import React from 'react'

type Props = {
  filterOption: FilterOption
  columnOption: ColumnOptions
}

type Query =
  | {
      type: DG_DATA_TYPES.Boolean | DG_DATA_TYPES.Select | DG_DATA_TYPES.String
      value: string
    }
  | {
      type: DG_DATA_TYPES.Number
      value: NumberFilter
    }
  | {
      type: DG_DATA_TYPES.Date
      value: DateFilter
    }

const dropdownStyle: CSSProperties = {
  color: '#000',
  padding: 5,
  fontSize: 18,
  borderColor: 'lightgray',
  borderWidth: 1,
  width: '100%',
  flex: 1,
  height: 'auto',
  minWidth: 150,
  borderRadius: '0.3rem',
}

const inputStyle: CSSProperties = {
  borderColor: 'lightgray',
  color: '#000',
  padding: 5,
  fontSize: 20,
  borderWidth: 1,
  width: '100%',
  flex: 1,
  height: 'auto',
  minWidth: 150,
  borderRadius: '0.3rem',
  margin: '0rem .5rem 0rem 0px',
  lineHeight: 'initial',
}

const inlineStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minWidth: '200px',
  borderRadius: '5px',
  overflow: 'hidden',
  flexWrap: 'wrap',
  flexDirection: 'row',
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  width: '100%',
  marginBottom: '1.5rem',
  maxWidth: '64rem',
}

const DataGridFilterForm: FC<Props> = ({ filterOption, columnOption }) => {
  const { formOption } = filterOption
  const defaultQuery = (): Query => {
    switch (formOption.type) {
      case DG_DATA_TYPES.Boolean: {
        if (!formOption.currentValue) return { type: formOption.type, value: 'Unfiltered' }
        return { type: formOption.type, value: formOption.currentValue }
      }
      case DG_DATA_TYPES.String:
      case DG_DATA_TYPES.Select:
        return { type: formOption.type, value: !formOption.currentValue ? '' : formOption.currentValue }
      case DG_DATA_TYPES.Number: {
        const d: Query = {
          type: formOption.type,
          value: !formOption.currentValue
            ? { value: '', secondValue: '', option: NumberFilterOptions.EQUAL }
            : formOption.currentValue,
        }
        return d
      }
      case DG_DATA_TYPES.Date: {
        const d: Query = {
          type: formOption.type,
          value: !formOption.currentValue
            ? { value: '', secondValue: '', option: DateFilterOptions.EQUAL }
            : formOption.currentValue,
        }
        return d
      }
    }
  }
  const [query, setQuery] = useState<Query>(defaultQuery())

  const getOptions = (options: Record<string, string>) => {
    return Object.values(options).map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))
  }

  const displayInput = () => {
    switch (filterOption.formOption.type) {
      case DG_DATA_TYPES.Boolean: {
        // starting with dropdown only
        // TODO: enable toggle option.
        if (query.type !== filterOption.formOption.type) {
          return null
        }
        return (
          <select
            value={query.value as string}
            style={dropdownStyle}
            onChange={e => setQuery({ ...query, value: e.target.value })}
          >
            <option value={'Yes'}>{filterOption.formOption.trueText}</option>
            <option value={'No'}>{filterOption.formOption.falseText}</option>
          </select>
        )
      }
      case DG_DATA_TYPES.Date: {
        if (query.type !== filterOption.formOption.type) {
          return null
        }
        const { value } = query
        return (
          <div style={inlineStyle}>
            <select
              value={value.option}
              style={dropdownStyle}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setQuery({ ...query, value: { ...value, option: e.target.value as DateFilterOptions } })
              }
            >
              {getOptions(DateFilterOptions)}
            </select>
            <input
              style={inputStyle}
              value={value.value}
              type='date'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery({ ...query, value: { ...value, value: e.target.value } })
              }
            />
            {value.option === 'Between' && (
              <div style={inlineStyle}>
                <p style={{ display: 'flex', paddingRight: '0.25em', alignItems: 'center' }}>&</p>
                <input
                  style={inputStyle}
                  value={value.secondValue}
                  type='date'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery({ ...query, value: { ...value, secondValue: e.target.value } })
                  }
                />
              </div>
            )}
          </div>
        )
      }
      case DG_DATA_TYPES.Number: {
        if (query.type !== filterOption.formOption.type) {
          return null
        }
        const { value } = query
        return (
          <div style={inlineStyle}>
            <select
              value={value.option}
              style={dropdownStyle}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setQuery({ ...query, value: { ...value, option: e.target.value as NumberFilterOptions } })
              }
            >
              {getOptions(NumberFilterOptions)}
            </select>
            <input
              style={inputStyle}
              value={value.value}
              type='number'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery({ ...query, value: { ...value, value: e.target.value } })
              }
            />
            {value.option === 'Between' && (
              <div style={inlineStyle}>
                <p style={{ display: 'flex', paddingRight: '0.25em', alignItems: 'center' }}>&</p>
                <input
                  style={inputStyle}
                  value={value.secondValue || ''}
                  type='number'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery({ ...query, value: { ...value, secondValue: e.target.value } })
                  }
                />
              </div>
            )}
          </div>
        )
      }
      case DG_DATA_TYPES.String:
        if (query.type !== filterOption.formOption.type) {
          return null
        }
        return (
          <input
            style={inputStyle}
            value={query.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery({ ...query, value: e.target.value })}
          />
        )
      case DG_DATA_TYPES.Select:
        if (query.type !== filterOption.formOption.type) {
          return null
        }
        return (
          <select
            value={query.value}
            style={dropdownStyle}
            onChange={e => setQuery({ ...query, value: e.target.value })}
          >
            {filterOption.formOption.options.map(option => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        )
    }
  }

  const displayCurrentValue = () => {
    switch (filterOption.formOption.type) {
      case DG_DATA_TYPES.String:
      case DG_DATA_TYPES.Boolean:
      case DG_DATA_TYPES.Select:
        return filterOption.formOption.currentValue || 'No filter applied.'
      case DG_DATA_TYPES.Number:
        if (!filterOption.formOption.currentValue.value) return 'No filter applied.'
        else
          return (
            `${filterOption.formOption.currentValue.option} ${filterOption.formOption.currentValue.option}` +
            (filterOption.formOption.currentValue.option === NumberFilterOptions.BETWEEN
              ? ` & ${filterOption.formOption.currentValue.secondValue}`
              : '')
          )
      case DG_DATA_TYPES.Date:
        if (!filterOption.formOption.currentValue.value) return 'No filter applied.'
        else
          return (
            `${filterOption.formOption.currentValue.option} ${filterOption.formOption.currentValue.option}` +
            (filterOption.formOption.currentValue.option === DateFilterOptions.BETWEEN
              ? ` & ${filterOption.formOption.currentValue.secondValue}`
              : '')
          )
    }
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    filterOption.onChange(query.value, filterOption.field)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1.25rem' }}>
      <p style={{ fontWeight: 'bold' }}>
        Select a filter for {columnOption.header ? columnOption.header : columnOption.field}
      </p>
      <p>Current Value: {displayCurrentValue()}</p>
      <form style={formStyle} onSubmit={handleApply}>
        {displayInput()}
      </form>
    </div>
  )
}

export default DataGridFilterForm
