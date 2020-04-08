import React from 'react';

import { Button } from 'fundamental-react';

import ModalWithForm from 'components/ModalWithForm/ModalWithForm';

import { RESOURCES_MANAGEMENT_PANEL } from '../../../../constants';

export default function EditResourcesManagementModal({ lambda }) {
  const modalOpeningComponent = (
    <Button glyph="edit" option="light">
      {RESOURCES_MANAGEMENT_PANEL.EDIT_MODAL.OPEN_BUTTON.TEXT}
    </Button>
  );

  return (
    <ModalWithForm
      title={RESOURCES_MANAGEMENT_PANEL.EDIT_MODAL.TITLE}
      modalOpeningComponent={modalOpeningComponent}
      confirmText={RESOURCES_MANAGEMENT_PANEL.EDIT_MODAL.CONFIRM_BUTTON.TEXT}
      id="add-event-trigger-modal"
      className="fd-modal--xl-size"
      renderForm={props => (
        <>null</>
        // <CreateEventTriggerForm
        //   {...props}
        //   lambda={lambda}
        // />
      )}
    />
  );
}
