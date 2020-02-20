import React from 'react';

import { CollapsiblePanel } from 'react-shared';
import ModalWithForm from 'components/ModalWithForm/ModalWithForm';

import CreateServiceBindingModal from './CreateServiceBindingModal/CreateServiceBindingModal';

export default function ServiceBindingsPanel() {
  const createServiceBindingModal = (
    <ModalWithForm
      title="Create new Service Binding"
      button={{ glyph: 'add', option: 'light' }}
      id="add-service-binding-modal"
      renderForm={props => <CreateServiceBindingModal {...props} />}
    />
  );

  return (
    <CollapsiblePanel
      title="Service Bindings"
      actions={createServiceBindingModal}
      children={'dupa'}
      isOpenInitially={false}
      className="fd-has-margin-medium"
    />
  );
}
