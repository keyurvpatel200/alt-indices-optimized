import { Modal, ModalBody } from 'reactstrap'
import { useState } from 'react'

// import TreeView from '../benchmarking/TreeView'

export default function Teams () {
  const [modal, setModal] = useState(true)
  const toggle = () => setModal(!modal)
  return (
    <div>
      <Modal isOpen={ modal } toggle={ toggle } centered>
        <ModalBody>
          {/* <TreeView/> */}
        </ModalBody>
      </Modal>
    </div>
  )
}