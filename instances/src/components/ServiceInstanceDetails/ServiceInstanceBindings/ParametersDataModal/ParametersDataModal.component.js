import React from 'react';

import LuigiClient from '@kyma-project/luigi-client';
import { NewModal, Button } from '@kyma-project/react-components';

import { JSONCode } from './styled';

const ParametersDataModal = ({ title, data }) => {
  return (
    <NewModal
      title={title}
      modalOpeningComponent={<Button compact option="light" glyph="syntax" />}
      onShow={() => LuigiClient.uxManager().addBackdrop()}
      onHide={() => LuigiClient.uxManager().removeBackdrop()}
    >
      <JSONCode>{JSON.stringify(data, undefined, 2)}</JSONCode>
    </NewModal>
  );
};

export default ParametersDataModal;
