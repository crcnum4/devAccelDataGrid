import React, { FC, useRef } from 'react'
import { ColumnOptions, onChangeFunc } from '../types/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { LIGHT_BLUE, SLATE } from '../types'

type Props = {
  options: ColumnOptions
  onChange?: onChangeFunc
  onResize: (position: number, field: string) => void
}

const Header: FC<Props> = ({ options, onChange, onResize }) => {
  const { width = '180px' } = options
  const divRef = useRef<HTMLDivElement>(null)

  const startResizing = () => {
    console.log('start')
    if (!divRef.current) return
    console.log(divRef.current.getBoundingClientRect().left)
    onResize(divRef.current.getBoundingClientRect().left, options.field)
  }

  if (options.headerOptions?.headerRender) {
    return options.headerOptions.headerRender
  }

  const handleLockClick = (field: string) => {
    if (!options.onLockClick) {
      if (!onChange) {
        throw new Error('Missing handlers for lockable column')
      }
      onChange(field, 'isLocked', options.isLocked)
      return
    }
    options.onLockClick(field, options.isLocked)
  }

  const handleHideClick = (field: string) => {
    if (!options.onHideClick) {
      if (!onChange) {
        throw new Error('Missing handlers for hideable column')
      }
      onChange(field, 'isHidden', !options.isHidden)
      return
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
      ref={divRef}
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
      <div
        style={{
          zIndex: 10,
          width: 10,
          cursor: 'ew-resize',
          backgroundColor: 'transparent',
          margin: 0,
          padding: 0,
        }}
        onMouseDown={startResizing}
      ></div>
    </div>
  )
}

export default Header
