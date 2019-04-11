import React, { useState } from 'react';
import { Button, Modal } from 'fundamental-react';

import {
  ActionsWrapper
} from "./styled";

interface ModalProps {
  title: string
  confirmText?: string;
  closeText?: string;
  openingComponent: React.ReactNode;
}

export const ModalComponent: React.FunctionComponent<ModalProps> = ({
  confirmText,
  closeText,
  openingComponent,
  children
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const actions = (
    <ActionsWrapper>
      <Button onClick={() => setShowModal(false)} type="light">
        {closeText ? closeText : "Cancel"}
      </Button>
      <Button onClick={() => setShowModal(false)}>
        {confirmText ? confirmText : "Create"}
      </Button>
    </ActionsWrapper>
  )

  return (
    <div>
      <div onClick={() => setShowModal(true)}>
        {openingComponent}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="New Configuration"
        actions={actions}
      >
        {children}
      </Modal>
    </div>
  )
}

export default ModalComponent;
