import React, { FC } from "react"
import { ColumnOptions } from "../types/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons"

type Props = {
  options: ColumnOptions
}

const Header: FC<Props> = ({options}) => {
  const {width = "180px"} = options

  if (options.headerOptions?.headerRender) {
    return options.headerOptions.headerRender;
  }

  const handleLockClick = (field: string) => {
    if (!options.onLockClick) {
      throw new Error("Missing onLockClick for lockable column");
    }
    options.onLockClick(field, options.isLocked);
  }
  
  const handleHideClick = (field: string) => {
    if (!options.onHideClick) {
      throw new Error("Missing onHideClick for hideable column");
    }

    options.onHideClick(field)
  }

  return (
    <div
      style={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'row',
        width,
        ...options.headerOptions?.style
      }}
      className={options.headerOptions?.className}
    >
      {options.canLock && 
        <FontAwesomeIcon 
          icon={options.isLocked ? faLock : faLockOpen}
          color="blue"
          onClick={() => handleLockClick(options.field)}
        />
      }
      {options.header ? options.header : options.field}
      {options.canHide &&
        <FontAwesomeIcon 
          icon={faEyeSlash}
          color="red"
          onClick={() => handleHideClick(options.field)}
        />
      }
    </div>
  )
}

export default Header