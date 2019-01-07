import React from 'react';
import { graphql, compose } from 'react-apollo';

import { Spinner } from '@kyma-project/react-components';
import ServiceClassDetails from './ServiceClassDetails.component';
import { EmptyList } from './styled';

import { GET_SERVICE_CLASS } from './queries';
import { CREATE_SERVICE_INSTANCE } from './mutations';

import builder from '../../commons/builder';

export default compose(
  graphql(GET_SERVICE_CLASS, {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      variables: {
        name: props.match.params.name,
        environment: builder.getCurrentEnvironmentId(),
      },
    }),
    name: 'serviceClass',
  }),
  graphql(CREATE_SERVICE_INSTANCE, {
    name: 'createServiceInstance',
  }),
)(({ serviceClass, ...otherProps }) => {
  const loading = serviceClass.loading;
  const scClass =
    serviceClass.clusterServiceClass ||
    serviceClass.serviceClass;

  if (loading) {
    return (
      <EmptyList>
        <Spinner size="40px" color="#32363a" />
      </EmptyList>
    );
  }
  if (!loading && !scClass) {
    return (
      <EmptyList>Service Class doesn't exist in this namespace</EmptyList>
    );
  }

  return (
    <ServiceClassDetails serviceClass={scClass} {...otherProps} />
  );
});

// (ServiceClassDetails);
