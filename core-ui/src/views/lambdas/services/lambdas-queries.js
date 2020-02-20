import React, { createContext, useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import LuigiClient from '@kyma-project/luigi-client';

import { GET_LAMBDAS, GET_LAMBDA } from 'views/lambdas/gql/queries';

export const LambdasQueriesContext = createContext({
  getLambdas: () => void 0,
  lambdasResponse: undefined,
  getLambda: () => void 0,
  lambdaResponse: undefined,
});

export const LambdasQueriesProvider = ({ children }) => {
  const [getLambdasQuery, lambdasResponse] = useLazyQuery(GET_LAMBDAS);
  const [getLambdaQuery, lambdaResponse] = useLazyQuery(GET_LAMBDA);

  async function getLambdas() {
    const namespace = LuigiClient.getEventData().environmentId;
    getLambdasQuery({
      variables: {
        namespace,
      },
      fetchPolicy: 'no-cache',
    });
  }

  async function getLambda(lambdaName) {
    const namespace = LuigiClient.getEventData().environmentId;
    getLambdaQuery({
      variables: {
        name: lambdaName,
        namespace,
      },
      fetchPolicy: 'no-cache',
    });
  }

  const exposedData = {
    getLambdas,
    lambdasResponse,
    getLambda,
    lambdaResponse,
  };

  return (
    <LambdasQueriesContext.Provider
      value={{
        ...exposedData,
      }}
    >
      {children}
    </LambdasQueriesContext.Provider>
  );
};

export function useLambdasQueries() {
  return useContext(LambdasQueriesContext);
}
