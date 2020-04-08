import { useState, useEffect } from 'react';
import { useNotification } from 'react-shared';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import deepEqual from 'deep-equal';

import { GET_LAMBDA } from 'components/Lambdas/gql/queries';
import { LAMBDA_EVENT_SUBSCRIPTION } from 'components/Lambdas/gql/subscriptions';

import { formatMessage, omitTypenames } from 'components/Lambdas/helpers/misc';
import { GQL_QUERIES } from 'components/Lambdas/constants';
import extractGraphQlErrors from 'shared/graphqlErrorExtractor';

export const useLambdaQuery = ({ name, namespace }) => {
  const notificationManager = useNotification();
  const [lambda, setLambda] = useState(null);
  const apolloClient = useApolloClient();

  const variables = {
    name,
    namespace,
  };

  const { data, error, loading } = useQuery(GET_LAMBDA, {
    variables,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!lambda && data && data.function) {
      const funcWithoutTypenames = omitTypenames(data.function);
      setLambda(funcWithoutTypenames);
    }
  }, [data, lambda, setLambda]);

  useEffect(() => {
    const observer = apolloClient.subscribe({
      query: LAMBDA_EVENT_SUBSCRIPTION,
      variables: {
        namespace,
        functionName: name,
      },
    });

    const subscription = observer.subscribe(({ data }) => {
      const func = data && data.functionEvent && data.functionEvent.function;
      if (!func) {
        return;
      }

      const funcWithoutTypenames = omitTypenames(func);
      const equal = deepEqual(lambda, funcWithoutTypenames);
      if (!equal) {
        // TODO: remove it after review
        console.warn('UPDATE LAMBDA');
        setLambda(funcWithoutTypenames);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lambda]);

  useEffect(() => {
    if (error) {
      const errorToDisplay = extractGraphQlErrors(error);

      const message = formatMessage(GQL_QUERIES.EVENT_TRIGGERS.ERROR_MESSAGE, {
        lambdaName: lambda.name,
        error: errorToDisplay,
      });

      notificationManager.notifyError({
        content: message,
        autoClose: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    lambda,
    error,
    loading,
  };
};
