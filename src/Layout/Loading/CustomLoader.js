import React, { useState, useEffect } from 'react'
import BlockUi from 'react-block-ui'
import { Loader, Types } from 'react-loaders'
import SweetAlert from 'sweetalert-react'
import _ from 'lodash'

export default function CustomLoader(props) {
  const [isSending, setSending] = useState(false)
  const [preSendingState, setPreSendingState] = useState(null)

  const [modalInfo, setModalInfo] = useState({
    show: false,
    message: '',
    responesMessage: '',
    type: 'success',
  })
  const [preModalInfo, setPreModalInfo] = useState(null)

  if (props.isSending !== preSendingState) {
    setSending(props.isSending)
    setPreSendingState(props.isSending)
  }

  if (!_.isEqual(props.modalInfo, preModalInfo)) {
    setModalInfo({ ...props.modalInfo })
    setPreModalInfo({ ...props.modalInfo })
  }
  return (
    <div>
      <BlockUi
        tag="div"
        blocking={isSending}
        className="block-overlay-dark"
        loader={<Loader color="#ffffff" active />}
      >
        {props.children}
        <SweetAlert
          title={modalInfo.message}
          confirmButtonColor=""
          show={modalInfo.show}
          text={modalInfo.responesMessage}
          type={modalInfo.type}
          onConfirm={() => {
            if (props.redirectPath) window.location.replace(props.redirectPath)
            setModalInfo({
              ...modalInfo,
              show: false,
            })
          }}
        />
      </BlockUi>
    </div>
  )
}
