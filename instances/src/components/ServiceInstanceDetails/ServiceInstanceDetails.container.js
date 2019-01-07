import React from 'react';
import { graphql, compose } from 'react-apollo';

import { SERVICE_INSTANCES_DETAILS } from './queries';
import { SERVICE_INSTANCES_DELETE_MUTATION } from '../ServiceInstances/mutations';

import ServiceInstanceDetails from './ServiceInstanceDetails.component';

import { Spinner } from '@kyma-project/react-components';
import { EmptyList } from './styled';

import builder from '../../commons/builder';
import { SERVICE_CATALOG_ADDONS, CONTENT } from '../../commons/graphql-errors';

export default compose(
  graphql(SERVICE_INSTANCES_DETAILS, {
    name: 'serviceInstances',
    options: () => {
      return {
        variables: {
          environment: builder.getCurrentEnvironmentId(),
        },
      };
    },
  }),
  graphql(SERVICE_INSTANCES_DELETE_MUTATION, {
    props: ({ mutate }) => ({
      deleteServiceInstance: name =>
        mutate({
          variables: {
            name,
            environment: builder.getCurrentEnvironmentId(),
          },
        }),
    }),
  }),
)(({ serviceInstances, ...otherProps }) => {
  if (serviceInstances.loading) {
    return (
      <EmptyList>
        <Spinner size="40px" color="#32363a" />
      </EmptyList>
    );
  }

  const instanceName = otherProps.match.params.name;
  const items = serviceInstances.serviceInstances || [];
  const instance = items.filter(instance => instance.name === instanceName)[0];

  const serviceInstance = {
    serviceInstance: instance ? { ...instance } : undefined,
    loading: false,
  };

  if (!serviceInstance.serviceInstance) {
    return <EmptyList>Service Instance doesn't exist</EmptyList>;
  }

  const isContentModuleDisabled = otherProps.modulesDisabled[CONTENT];
  const isServiceCatalogAddonsModuleDisabled = otherProps.modulesDisabled[SERVICE_CATALOG_ADDONS];

  return (
    <ServiceInstanceDetails serviceInstance={serviceInstance} {...otherProps} isContentModuleDisabled={isContentModuleDisabled} isServiceCatalogAddonsModuleDisabled={isServiceCatalogAddonsModuleDisabled} />
  );
});
