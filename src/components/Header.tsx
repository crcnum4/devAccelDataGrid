import React, { FC } from 'react'
import { ColumnOptions } from '../types/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { LIGHT_BLUE, SLATE } from '../types'

type Props = {
  options: ColumnOptions
}

const Header: FC<Props> = ({ options }) => {
  const { width = '180px' } = options

  if (options.headerOptions?.headerRender) {
    return options.headerOptions.headerRender
  }

  const handleLockClick = (field: string) => {
    if (!options.onLockClick) {
      throw new Error('Missing onLockClick for lockable column')
    }
    options.onLockClick(field, options.isLocked)
  }

  const handleHideClick = (field: string) => {
    if (!options.onHideClick) {
      throw new Error('Missing onHideClick for hideable column')
    }

    options.onHideClick(field)
  }

  return (
    <div
      style={{
        padding: '.5em',
        display: 'flex',
        flexDirection: 'row',
        border: `1px solid ${SLATE}`,
        backgroundColor: `${LIGHT_BLUE}`,
        minWidth: width,
        width,
        maxWidth: width,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        ...options.headerOptions?.style,
      }}
      className='data-header'
    >
      {options.canLock && (
        <FontAwesomeIcon
          icon={options.isLocked ? faLockOpen : faLock}
          color='blue'
          onClick={() => handleLockClick(options.field)}
          style={{ cursor: 'pointer' }}
        />
      )}
      <p style={{ margin: 'auto' }}>{options.header ? options.header : options.field}</p>
      {options.canHide && (
        <FontAwesomeIcon
          icon={faEyeSlash}
          color='red'
          onClick={() => handleHideClick(options.field)}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  )
}

export default Header
