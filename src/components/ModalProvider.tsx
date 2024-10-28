import React, { createContext, ReactNode, FC } from 'react'
import useModal from './useModal'
import Modal from './Modal'

const ModalContext = createContext<{
  modal: boolean
  handleModal: (content: false | ReactNode) => void
  modalContent: ReactNode
}>({ modal: false, handleModal: () => {}, modalContent: null })

const ModalProvider: FC<{ children: ReactNode }> = props => {
  const { modal, handleModal, modalContent } = useModal()

  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      {modal && <Modal />}
      {props.children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
