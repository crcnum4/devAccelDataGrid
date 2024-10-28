import React, { FC, ReactNode } from 'react'

type OverlayProps = {
  children: ReactNode
  active?: boolean
  onClose: () => void
}

const Overlay: FC<OverlayProps> = props => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgb(75 85 99)',
        opacity: 0.5,
        overflowY: 'auto',
        height: '100%',
        width: '100%',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={event => {
        if (event.target === event.currentTarget) props.onClose()
      }}
    >
      {props.children}
    </div>
  )
}

export default Overlay
