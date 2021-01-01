import React, { useState } from 'react'
import SweetAlert from 'sweetalert-react'

export default function ModalAlert({
  message,
  responesMessage,
  type,
  redirectPath,
}) {
  const [show, setShow] = useState(false)

  return (
    <SweetAlert
      title={message}
      confirmButtonColor=""
      show={show}
      text={responesMessage}
      type={type}
      onConfirm={() => {
        if (redirectPath) window.location.replace(redirectPath)
        setShow(false)
      }}
    />
  )
}
