import { useEffect } from 'react';
import { useNotification } from 'react-shared';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { GET_SERVICE_BINDING_USAGES } from 'components/Lambdas/gql/queries';
import { SERVICE_BINDING_USAGE_EVENT_SUBSCRIPTION } from 'components/Lambdas/gql/subscriptions';

import {
  useQueue,
  useStateWithCallback,
} from 'components/Lambdas/helpers/hooks';
import {
  formatMessage,
  handleSubscriptionEvent,
} from 'components/Lambdas/helpers/misc';
import { GQL_QUERIES, FUNCTION_USAGE_KIND } from 'components/Lambdas/constants';
import extractGraphQlErrors from 'shared/graphqlErrorExtractor';

export const useServiceBindingUsagesQuery = ({ lambda }) => {
  const notificationManager = useNotification();
  const [bindingUsages, setBindingUsages] = useStateWithCallback([]);
  const apolloClient = useApolloClient();

  function processQueue(event, done) {
    const newBindingUsages = handleSubscriptionEvent(
      {
        type: event.type,
        newItem: event.serviceBindingUsage,
      },
      bindingUsages,
    );
    setBindingUsages(newBindingUsages, () => {
      done();
    });
  }
  const [addToQueue] = useQueue(processQueue);

  const variables = {
    namespace: lambda.namespace,
    resourceKind: FUNCTION_USAGE_KIND,
    resourceName: lambda.name,
  };

  const { data, error, loading } = useQuery(GET_SERVICE_BINDING_USAGES, {
    variables,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.serviceBindingUsages && !bindingUsages.length) {
      setBindingUsages(data.serviceBindingUsages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const observer = apolloClient.subscribe({
      query: SERVICE_BINDING_USAGE_EVENT_SUBSCRIPTION,
      variables,
    });

    const subscription = observer.subscribe(({ data }) => {
      if (data && data.serviceBindingUsageEvent) {
        addToQueue(data.serviceBindingUsageEvent);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lambda.namespace, lambda.name]);

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
    bindingUsages,
    error,
    loading,
  };
};
