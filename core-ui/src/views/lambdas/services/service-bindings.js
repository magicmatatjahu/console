import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import LuigiClient from '@kyma-project/luigi-client';

import { useNotification } from 'react-shared';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';

import extractGraphQlErrors from 'shared/graphqlErrorExtractor';

import { GET_SERVICE_INSTANCES } from 'views/lambdas/gql/queries';
import {
  CREATE_SERVICE_BINDING,
  DELETE_SERVICE_BINDING,
  CREATE_SERVICE_BINDING_USAGE,
  DELETE_SERVICE_BINDING_USAGE,
} from 'views/lambdas/gql/mutations';

const ACTION_TYPE = {
  CREATE: 0,
  DELETE: 0 << 1,
};

export const ServiceBindingsContext = createContext({
  serviceInstances: [],
  createServiceBinding: () => void 0,
  deleteServiceBinding: () => void 0,
});

export const ServiceBindingsProvider = ({ children }) => {
  const { lambdaResponse } = useLambdasQueries();
  const notificationManager = useNotification();

  const [serviceInstances, setServiceInstances] = useState([]);
  const [getServiceInstancesQuery, serviceInstancesResponse] = useLazyQuery(
    GET_SERVICE_INSTANCES,
  );

  const [createServiceBindingMutation] = useMutation(CREATE_SERVICE_BINDING);
  const [deleteServiceBindingMutation] = useMutation(DELETE_SERVICE_BINDING);
  const [createServiceBindingUsageMutation] = useMutation(
    CREATE_SERVICE_BINDING_USAGE,
  );
  const [deleteServiceBindingUsageMutation] = useMutation(
    DELETE_SERVICE_BINDING_USAGE,
  );

  useEffect(() => {
    // Temporary hack for issue https://github.com/apollographql/react-apollo/issues/3365
    setTimeout(() => {
      getServiceInstances();
    }, 1);
  }, []);

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
    const lambdaName = lambdaResponse.data.function.name;
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

  function handleError(
    serviceBindingName,
    error,
    mutationType = ACTION_TYPE.CREATE,
  ) {
    let actionVerb = 'creating';
    if (mutationType & ACTION_TYPE.DELETE) {
      actionVerb = 'deleting';
    }

    const errorToDisplay = extractGraphQlErrors(error);
    notificationManager.notifyError({
      content: `Error while ${actionVerb} Service Binding ${serviceBindingName}: ${errorToDisplay}`,
    });
  }

  async function handleDeleteServiceBinding(serviceBindingName) {
    const namespace = LuigiClient.getEventData().environmentId;
    try {
      response = await deleteServiceBindingUsageMutation({
        variables: {
          serviceBindingUsageName: serviceBindingName,
          namespace,
        },
      });

      if (response.error) {
        handleError(serviceBindingName, response.error, ACTION_TYPE.DELETE);
        return;
      }

      let response = await deleteServiceBindingMutation({
        variables: {
          serviceBindingName,
          namespace,
        },
      });

      if (response.error) {
        handleError(serviceBindingName, response.error, ACTION_TYPE.DELETE);
        return;
      }

      const isSuccess =
        response.data &&
        response.data.deleteServiceBinding &&
        response.data.deleteServiceBinding.name === serviceBindingName;

      if (isSuccess) {
        notificationManager.notifySuccess({
          content: `Service Binding ${serviceBindingName} removing...`,
        });
      }
    } catch (err) {
      handleError(serviceBindingName, err, ACTION_TYPE.DELETE);
    }
  }

  async function deleteServiceBinding(serviceBindingName) {
    LuigiClient.uxManager()
      .showConfirmationModal({
        header: `Remove ${serviceBindingName} Service Binding`,
        body: `Are you sure you want to delete Service Binding "${serviceBindingName}"?`,
        buttonConfirm: 'Delete',
        buttonDismiss: 'Cancel',
      })
      .then(() => handleDeleteServiceBinding(serviceBindingName))
      .catch(_ => {});
  }

  function prepareServiceBindingUsageParameters(
    serviceBindingName,
    serviceBindingUsageParameters = undefined,
  ) {
    return {
      name: serviceBindingName,
      serviceBindingRef: {
        name: serviceBindingName,
      },
      usedBy: {
        name: lambdaResponse.data.function.name,
        kind: 'function',
      },
      parameters: serviceBindingUsageParameters,
    };
  }

  async function createServiceBinding({
    serviceInstanceName,
    serviceBindingUsageParameters,
    serviceBindingParameters,
    createNewCredentials = false,
  }) {
    const namespace = LuigiClient.getEventData().environmentId;

    const lambdaName = lambdaResponse.data.function.name;
    const serviceBindingName = `${lambdaName}-${serviceInstanceName}`;

    try {
      let response = await createServiceBindingMutation({
        variables: {
          serviceBindingName,
          serviceInstanceName,
          namespace,
          parameters: serviceBindingParameters,
        },
      });

      if (response.error) {
        handleError(serviceBindingName, response.error, ACTION_TYPE.CREATE);
        return;
      }

      const serviceBindingUsageInput = prepareServiceBindingUsageParameters(
        serviceBindingName,
        serviceBindingUsageParameters,
      );
      response = await createServiceBindingUsageMutation({
        variables: {
          createServiceBindingUsageInput: serviceBindingUsageInput,
          namespace,
        },
      });

      if (response.error) {
        handleError(serviceBindingName, response.error, ACTION_TYPE.CREATE);
        return;
      }

      const isSuccess =
        response.data &&
        response.data.createServiceBindingUsage &&
        response.data.createServiceBindingUsage.name === serviceBindingName;

      if (isSuccess) {
        notificationManager.notifySuccess({
          content: `Service Binding ${serviceBindingName} creating...`,
        });
      }
    } catch (err) {
      handleError(serviceBindingName, err, ACTION_TYPE.CREATE);
    }
  }

  const exposedData = {
    serviceInstances,
    createServiceBinding,
    deleteServiceBinding,
  };

  return (
    <ServiceBindingsContext.Provider
      value={{
        ...exposedData,
      }}
    >
      {children}
    </ServiceBindingsContext.Provider>
  );
};

export function useServiceBindings() {
  return useContext(ServiceBindingsContext);
}
