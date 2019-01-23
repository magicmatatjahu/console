import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import {
  Button,
  NewModal,
  Toolbar,
} from '@kyma-project/react-components';

import {
  ServiceInstanceToolbarHeadline,
  ServiceInstanceToolbarHeadlineLink,
} from './styled';

const ServiceInstanceToolbar = ({
  serviceInstance,
  deleteServiceInstance,
  history,
}) => {
  const handleDelete = async () => {
    await deleteServiceInstance(serviceInstance.name);
    setTimeout(() => {
      history.goBack();
    }, 100);
  };

  const goToServiceInstances = () => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate('instances');
  };

  const instanceClass =
    serviceInstance &&
    (serviceInstance.clusterServiceClass
      ? serviceInstance.clusterServiceClass
      : serviceInstance.serviceClass);

  return (
    <Toolbar
      title={
        <ServiceInstanceToolbarHeadline>
          <ServiceInstanceToolbarHeadlineLink onClick={goToServiceInstances}>
            Service Instances
          </ServiceInstanceToolbarHeadlineLink>{' '}
          / {serviceInstance.name}
        </ServiceInstanceToolbarHeadline>
      }
      description={instanceClass && instanceClass.description}
    >
      <NewModal
        title="Delete"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        modalOpeningComponent={
          <Button option="light" type="negative">
            Delete
          </Button>
        }
        type="negative"
        onShow={() => LuigiClient.uxManager().addBackdrop()}
        onHide={() => LuigiClient.uxManager().removeBackdrop()}
      >
        {`Are you sure you want to delete instance "${
          serviceInstance.name
        }"?`}
      </NewModal>
    </Toolbar>
  );
};

export default ServiceInstanceToolbar;
