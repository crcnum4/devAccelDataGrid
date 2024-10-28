import React, { FC, useContext } from 'react'
import { ModalContext } from './ModalProvider'
import Overlay from './Overlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal: FC = () => {
  const { modal, modalContent, handleModal } = useContext(ModalContext)
  if (modal) {
    return (
      <Overlay active onClose={() => handleModal(false)}>
        <div
          style={{
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
            minWidth: '30vw',
            maxWidth: '65vw',
            maxHeight: '75vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            zIndex: 20,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <FontAwesomeIcon icon={faClose} onClick={() => handleModal(false)} />
          </div>
          {modalContent}
        </div>
      </Overlay>
    )
  }
  return null
}

export default Modal
