import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import './ModalConfirmDelete.css'

export default function ModalComfirmDelete(props) {
  const [isModalOpen, setModalOpenState] = useState(false)
  const [preToggleState, setPreToggleState] = useState(false)

  if (props.toggle !== preToggleState) {
    setModalOpenState(true)
    setPreToggleState(props.toggle)
  }

  const toggle = () => {
    // console.log(isModalOpen)
    setModalOpenState(!isModalOpen)
    // props.toggle(isModalOpen)
  }

  return (
    <Modal isOpen={isModalOpen} toggle={toggle} className="modal-delete">
      <ModalHeader toggle={toggle}>
        Bạn có chắc chắn muốn xóa không?
      </ModalHeader>
      <ModalBody>
        Sau khi xóa, dữ liệu không thể phục hổi, hãy chắc chắn là bạn muốn xóa
        nó
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={toggle}>
          Hủy
        </Button>
        <Button
          color="danger"
          onClick={() => {
            props.deleteItemHandler()
            toggle()
          }}
        >
          Xóa
        </Button>{' '}
      </ModalFooter>
    </Modal>
  )
}
