import { useState, ReactNode, SetStateAction, Dispatch } from 'react'

export type ModalHook = {
  modal: boolean
  modalContent: ReactNode
  setModalContent: Dispatch<SetStateAction<ReactNode>>
}

const useModal = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)

  const handleModal = (content: false | ReactNode) => {
    if (content === false) {
      setModal(false)
      setModalContent(null)
    } else {
      setModal(true)
      setModalContent(content)
    }
  }

  return { modal, handleModal, modalContent }
}

export default useModal
