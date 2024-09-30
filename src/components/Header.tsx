import React, { FC } from 'react'
import { ColumnOptions, ResizeFunc, onChangeFunc } from '../types/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { LIGHT_BLUE, SLATE } from '../types'

type Props = {
  options: ColumnOptions
  onChange?: onChangeFunc
  onResize: ResizeFunc
}

const Header: FC<Props> = ({ options, onResize }) => {
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
        padding: '0.5rem',
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
        position: 'relative',
        ...options.headerOptions?.style,
      }}
      className='data-header'
    >
      <div
        style={{
          position: 'absolute',
          right: 0,
          zIndex: 100,
          cursor: 'ew-resize',
          height: '100%',
          width: '10px',
        }}
        onMouseDown={e => onResize(options.field, e.clientX)}
      />
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
