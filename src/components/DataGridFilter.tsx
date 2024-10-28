import React, { FC } from 'react'
import { ColumnOptions, FilterOption, SLATE, renderFilterValue } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import useModal from './useModal'
import DataGridFilterForm from './DataGridFilterForm'

type Props = {
  columnOptions: ColumnOptions
  filterOption: FilterOption
}

const DataGridFilter: FC<Props> = ({ filterOption, columnOptions }) => {
  const { width = '180px' } = columnOptions
  const { handleModal } = useModal()
  if (filterOption.formOption.renderer) {
    return filterOption.formOption.renderer(filterOption)
  }
  return (
    <div
      className='data-cell'
      style={{
        padding: '0.5rem',
        minWidth: width,
        maxWidth: width,
        width,
        border: `1px solid ${SLATE}`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flexDirection: 'row',
      }}
    >
      <p style={{ flex: 1 }}>{renderFilterValue(filterOption)}</p>
      <FontAwesomeIcon
        icon={faFilter}
        onClick={() => handleModal(<DataGridFilterForm columnOption={columnOptions} filterOption={filterOption} />)}
      />
    </div>
  )
}

export default DataGridFilter
