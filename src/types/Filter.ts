import { ReactNode } from 'react'

export enum DG_DATA_TYPES {
  String,
  Number,
  Date,
  Boolean,
  Select,
}

export type FilterFormRender = {
  renderer?: (options: FilterOption) => ReactNode
}

export type FormOptions =
  | {
      type: DG_DATA_TYPES.Boolean
      option: 'Dropdown' | 'Toggle'
      trueText?: string
      falseText?: string
      currentValue: 'Yes' | 'No' | null
    }
  | {
      type: DG_DATA_TYPES.String
      maxChars?: number
      currentValue: string | null
    }
  | {
      type: DG_DATA_TYPES.Date
      pastAllowed?: boolean
      futureAllowed?: boolean
      floor?: Date
      ceiling?: Date
      allowedFilters?: DateFilterOptions[]
      currentValue: DateFilter
    }
  | {
      type: DG_DATA_TYPES.Number
      step: number
      max: number
      min: number
      allowNegatives: boolean
      decimal: boolean
      allowedFilters?: NumberFilterOptions[]
      currentValue: NumberFilter
    }
  | {
      type: DG_DATA_TYPES.Select
      options: { value: string; text: string }[]
      currentValue: string
    }

export type FormOption = FormOptions & FilterFormRender

export type FilterOption = {
  field: string
  onChange: (newValue: string | NumberFilter | DateFilter | null, field: string) => void
  formatter?: (formOption: FormOption, field: string) => string
  formOption: FormOption
}

export type FilterOptions = { [field: string]: FilterOption }

export enum DateFilterOptions {
  EQUAL = 'Exact Match',
  BEFORE = 'Before',
  AFTER = 'After',
  BETWEEN = 'Between',
}

export enum NumberFilterOptions {
  EQUAL = 'Equal to',
  GREATER_THAN = 'Greater than',
  LESS_THAN = 'Less than',
  GREATER_THAN_EQUAL_TO = 'Greater than or equal to',
  LESS_THAN_EQUAL_TO = 'Less than or equal to',
  BETWEEN = 'Between',
}

export type DateFilter = {
  value: string
  secondValue?: string
  option: DateFilterOptions
}

export type NumberFilter = {
  value: string
  secondValue?: string
  option: NumberFilterOptions
}

export const renderFilterValue = (filterOption: FilterOption): string => {
  const { formOption } = filterOption
  if (filterOption.formatter) {
    return filterOption.formatter(filterOption.formOption, filterOption.field)
  }
  switch (formOption.type) {
    case DG_DATA_TYPES.Boolean:
    case DG_DATA_TYPES.Select:
    case DG_DATA_TYPES.String:
      if (!formOption.currentValue) return 'Unfiltered'
      return formOption.currentValue
    case DG_DATA_TYPES.Date: {
      const { value, secondValue, option } = formOption.currentValue
      if (!value) return 'Unfiltered'
      let text = `${option} ${value}`
      if (secondValue) {
        text += ` and ${secondValue}`
      }
      return text
    }
    case DG_DATA_TYPES.Number: {
      const { value, secondValue, option } = formOption.currentValue
      if (!value) return 'Unfiltered'
      let text = `${option} ${value}`
      if (secondValue) {
        text += ` and ${secondValue}`
      }
      return text
    }
  }
}
