import React, { FC, useEffect, useRef, useState } from 'react'
import { ColumnOptions, onChangeFunc } from '../types/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { LIGHT_BLUE, SLATE } from '../types'

type Props = {
  options: ColumnOptions
  onChange?: onChangeFunc
}

const Header: FC<Props> = ({ options, onChange }) => {
  const { width = '180px' } = options
  const MIN_WIDTH = 15
  const [isResizing, setIsResizing] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  const startResizing = () => {
    setIsResizing(true)
  }

  const stopResizing = () => {
    setIsResizing(false)
  }

  const resizing = (e: MouseEvent) => {
    if (isResizing && divRef.current) {
      const newWidth = e.clientX - divRef.current.getBoundingClientRect().left
      if (!options.onWidthChange) {
        if (!onChange) {
          throw new Error('Missing handler for width change')
        }
        onChange(options.field, 'width', newWidth < MIN_WIDTH ? MIN_WIDTH : newWidth, options)
        return
      }
      options.onWidthChange(newWidth < MIN_WIDTH ? MIN_WIDTH : newWidth)
    }
  }

  useEffect(() => {
    const ref = divRef.current

    if (!ref) return

    ref.addEventListener('mousemove', resizing)
    ref.addEventListener('mouseup', stopResizing)

    return () => {
      ref.removeEventListener('mousemove', resizing)
      ref.removeEventListener('mouseup', stopResizing)
    }
  })

  if (options.headerOptions?.headerRender) {
    return options.headerOptions.headerRender
  }

  const handleLockClick = (field: string) => {
    if (!options.onLockClick) {
      if (!onChange) {
        throw new Error('Missing handlers for lockable column')
      }
      onChange(field, 'isLocked', !options.isLocked, options)
      return
    }
    options.onLockClick(field, options.isLocked)
  }

  const handleHideClick = (field: string) => {
    if (!options.onHideClick) {
      if (!onChange) {
        throw new Error('Missing handlers for hideable column')
      }
      onChange(field, 'isHidden', !options.isHidden, options)
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
          width: 3,
          cursor: 'ew-resize',
          backgroundColor: 'transparent',
          margin: 0,
          padding: 0,
        }}
        ref={divRef}
        onMouseDown={() => startResizing}
      ></div>
    </div>
  )
}

export default Header
