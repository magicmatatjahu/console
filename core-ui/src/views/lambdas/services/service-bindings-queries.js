import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import LuigiClient from '@kyma-project/luigi-client';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';

import { GET_SERVICE_INSTANCES } from 'views/lambdas/gql/queries';

export const ServiceBindingsQueriesContext = createContext({
  getLambdas: () => void 0,
  lambdasResponse: undefined,
  getLambda: () => void 0,
  lambdaResponse: undefined,
});

export const ServiceBindingsQueriesProvider = ({ children }) => {
  const {
    lambdaResponse: {
      data = {
        function: undefined,
      },
    },
  } = useLambdasQueries();

  const [serviceInstances, setServiceInstances] = useState([]);
  const [getServiceInstancesQuery, serviceInstancesResponse] = useLazyQuery(
    GET_SERVICE_INSTANCES,
  );

  useEffect(() => {
    if (
      serviceInstancesResponse.data &&
      serviceInstancesResponse.data.serviceInstances
    ) {
      setServiceInstances(
        filterServiceInstances(serviceInstancesResponse.data.serviceInstances),
      );
    }
  }, [serviceInstancesResponse]);

  async function getServiceInstances() {
    const namespace = LuigiClient.getEventData().environmentId;
    getServiceInstancesQuery({
      variables: {
        namespace,
      },
      fetchPolicy: 'no-cache',
    });
  }

  function filterServiceInstances(serviceInstances = []) {
    const lambdaName = data.function.name;
    return (
      serviceInstances
        // Filter Running and bindable ServiceInstances
        .filter(
          serviceInstance =>
            serviceInstance.bindable &&
            serviceInstance.status.type === 'RUNNING',
        )
        // Filter ServiceInstances without connected ServiceBindingUsages with present lambda name
        .filter(
          serviceInstance =>
            !serviceInstance.serviceBindingUsages.filter(
              usage =>
                usage.usedBy.name === lambdaName &&
                usage.usedBy.kind === 'function',
            ).length,
        )
    );
  }

  const exposedData = {
    getServiceInstances,
    serviceInstances,
  };

  return (
    <ServiceBindingsQueriesContext.Provider
      value={{
        ...exposedData,
      }}
    >
      {children}
    </ServiceBindingsQueriesContext.Provider>
  );
};

export function useServiceBindingsQueries() {
  return useContext(ServiceBindingsQueriesContext);
}
