import React, { createContext, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import LuigiClient from '@kyma-project/luigi-client';

import { useNotification } from 'react-shared';

import extractGraphQlErrors from 'shared/graphqlErrorExtractor';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';

import {
  CREATE_LAMBDA,
  DELETE_LAMBDA,
  UPDATE_LAMBDA,
} from 'views/lambdas/gql/mutations';

const ACTION_TYPE = {
  UPDATE: 0,
  DELETE: 0 << 1,
  CREATE: 0 << 2,
};

const UPDATE_TYPE = {
  LABELS: 0,
  CODE_AND_DEPENDENCIES: 0 << 1,
  RUNTIME: 0 << 2,
  RESOURCES: 0 << 3,
};

export const LambdasMutationsContext = createContext({
  createLambda: () => void 0,
  deleteLambda: () => void 0,
  updateLambda: () => void 0,
});

export const LambdasMutationsProvider = ({ children }) => {
  const {
    lambdaResponse: {
      data = {
        function: undefined,
      },
    },
  } = useLambdasQueries();
  const notificationManager = useNotification();

  const [createLambdaMutation] = useMutation(CREATE_LAMBDA);
  const [updateLambdaMutation] = useMutation(UPDATE_LAMBDA);
  // onCompleted is fired before lambda is deleted therefore setTimeout is necessary.
  // TODO(magicmatatjahu): Remove setTimeout, when subscriptions for lambdas will be available.
  const [deleteLambdaMutation] = useMutation(DELETE_LAMBDA, {
    // onCompleted: () => {
    //   setTimeout(() => {
    //     refetch();
    //   }, REFETCH_TIMEOUT);
    // },
  });

  function handleError(lambdaName, error, mutationType = ACTION_TYPE.UPDATE) {
    let actionVerb = 'updating';
    if (mutationType & ACTION_TYPE.DELETE) {
      actionVerb = 'deleting';
    }
    if (mutationType & ACTION_TYPE.CREATE) {
      actionVerb = 'creating';
    }

    const errorToDisplay = extractGraphQlErrors(error);
    notificationManager.notifyError({
      content: `Error while ${actionVerb} lambda ${lambdaName}: ${errorToDisplay}`,
    });
  }

  async function handleUpdateLambda(
    lambdaName,
    params,
    updateType = UPDATE_TYPE.LABELS,
  ) {
    const namespace = LuigiClient.getEventData().environmentId;
    try {
      const lambda = data.function;
      const mergedParams = {
        labels: lambda.labels,
        runtime: lambda.runtime,
        content: lambda.content,
        dependencies: lambda.dependencies,
        ...params,
      };

      const { data, error } = await updateLambdaMutation({
        variables: {
          name: lambdaName,
          namespace,
          params: mergedParams,
        },
      });

      if (error) {
        handleError(lambdaName, error, ACTION_TYPE.UPDATE);
        return;
      }

      const isSuccess =
        data && data.updateFunction && data.updateFunction.name === lambdaName;

      if (isSuccess) {
        notificationManager.notifySuccess({
          content: `Lambda ${lambdaName} updating....`,
        });
      }
    } catch (err) {
      handleError(lambdaName, err, ACTION_TYPE.UPDATE);
    }
  }

  async function updateLambda(lambdaName, params) {
    LuigiClient.uxManager()
      .showConfirmationModal({
        header: `Update ${lambdaName} lambda`,
        body: `Are you sure you want to update lambda "${lambdaName}"?`,
        buttonConfirm: 'Update',
        buttonDismiss: 'Cancel',
      })
      .then(() => handleUpdateLambda(lambdaName, params))
      .catch(_ => {});
  }

  async function handleDeleteLambda(lambdaName) {
    const namespace = LuigiClient.getEventData().environmentId;
    try {
      const { data, error } = await deleteLambdaMutation({
        variables: {
          name: lambdaName,
          namespace,
        },
      });

      if (error) {
        handleError(lambdaName, error, ACTION_TYPE.DELETE);
        return;
      }

      const isSuccess =
        data && data.deleteFunction && data.deleteFunction.name === lambdaName;

      if (isSuccess) {
        notificationManager.notifySuccess({
          content: `Lambda ${lambdaName} removing...`,
        });
      }
    } catch (err) {
      handleError(lambdaName, err, ACTION_TYPE.DELETE);
    }
  }

  async function deleteLambda(lambdaName) {
    LuigiClient.uxManager()
      .showConfirmationModal({
        header: `Remove ${lambdaName} lambda`,
        body: `Are you sure you want to delete lambda "${lambdaName}"?`,
        buttonConfirm: 'Delete',
        buttonDismiss: 'Cancel',
      })
      .then(() => handleDeleteLambda(lambdaName))
      .catch(_ => {});
  }

  async function handleCreateLambda(lambdaName) {
    const namespace = LuigiClient.getEventData().environmentId;
  }

  async function createLambda(lambdaName) {
    LuigiClient.uxManager()
      .showConfirmationModal({
        header: `Create ${lambdaName} lambda`,
        body: `Are you sure you want to create lambda "${lambdaName}"?`,
        buttonConfirm: 'Create',
        buttonDismiss: 'Cancel',
      })
      .then(() => handleCreateLambda(lambdaName))
      .catch(_ => {});
  }

  const exposedData = {
    updateLambda,
    deleteLambda,
    createLambda,
  };

  return (
    <LambdasMutationsContext.Provider
      value={{
        ...exposedData,
      }}
    >
      {children}
    </LambdasMutationsContext.Provider>
  );
};

export function useLambdasMutations() {
  return useContext(LambdasMutationsContext);
}
