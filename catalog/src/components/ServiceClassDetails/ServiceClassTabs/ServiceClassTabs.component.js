import React from 'react';
import PropTypes from 'prop-types';
import {
  Status,
  StatusWrapper,
} from '@kyma-project/react-components';
import { GenericComponent } from '@kyma-project/generic-documentation';
import { serviceClassConstants } from '../../../variables';

function getTabElementsIndicator(instancesCount) {
  return (
    <StatusWrapper key="instances-no">
      <Status>{instancesCount}</Status>
    </StatusWrapper>
  );
}

const ServiceClassTabs = ({
  serviceClass,
}) => {
  const docsTopic =
    serviceClass && (serviceClass.docsTopic || serviceClass.clusterDocsTopic);

  const additionalTabs = [{
    label: (
      <>
        <span>{serviceClassConstants.instancesTabText}</span>
        {this.getTabElementsIndicator(
          this.props.serviceClass.instances.length,
        )}
      </>
    ),
    content: (
      <ServiceClassInstancesTable
        tableData={serviceClass.instances}
      />
    )
  }];

  return (
    <GenericComponent 
      docsTopic={docsTopic} 
      additionalTabs={additionalTabs}
      layout="catalog-ui" 
    />
  );
}

ServiceClassTabs.propTypes = {
  serviceClass: PropTypes.object.isRequired,
};

export default ServiceClassTabs;
