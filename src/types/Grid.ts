import { CSSProperties, ReactNode } from 'react'

export type onChangeFunc = (field: string, key: string, value: any) => void

export type GridData = {
  [key: string]: any
}

export type HeaderOptions = {
  style?: CSSProperties
  className?: string
  headerRender?: ReactNode
}

export type GridContent = GridData[]

export type ColumnOptions = {
  field: string
  width?: CSSProperties['width']
  header?: string
  headerOptions?: HeaderOptions
  getValue?: (data: GridData) => any
  formatter?: (data: GridData) => string
  render?: (data: GridData) => ReactNode
  isLocked?: boolean
  isHidden?: boolean
  canLock?: boolean
  canHide?: boolean
  onLockClick?: (field: string, isLocked?: boolean) => void
  onHideClick?: (field: string) => void
  // sortable?: boolean
  // sorter: (a: GridData, b: GridData) => -1 | 0 | 1
  canFilter?: boolean
  currentFilter?: string
  filterer?: (data: GridData, filter: string) => boolean
  onChangeFilter?: (field: string) => void
}
