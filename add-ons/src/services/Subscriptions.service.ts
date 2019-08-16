import { useContext } from 'react';
import gql from 'graphql-tag';
import createUseContext from 'constate';
import {
  GlobalService,
  useSubscriptions as us,
  OnSubscriptionArgs,
  Subscription,
} from '@kyma-project/common';

import { ConfigurationsService } from '../services';
import { Configuration } from '../types';
import { NOTIFICATION, CONFIGURATION_VARIABLE } from '../constants';

const subscriptionFields = `
  name
  urls
  labels
`;

export const CLUSTER_ADDONS_CONFIGURATION_EVENT_SUBSCRIPTION = gql`
  subscription clusterAddonsConfigurationEvent {
    clusterAddonsConfigurationEvent {
      type
      addonsConfiguration {
        ${subscriptionFields}
      }
    }
  }
`;

export const ADDONS_CONFIGURATION_EVENT_SUBSCRIPTION = gql`
  subscription addonsConfigurationEvent(
    $namespace: String!
  ) {
    addonsConfigurationEvent(
      namespace: $namespace
    ) {
      type
      addonsConfiguration {
        ${subscriptionFields}
      }
    }
  }
`;

interface AddonsConfigurationSubscriptionVariables {
  namespace?: string;
}

const useSubscriptions = () => {
  const { currentNamespace } = useContext(GlobalService);
  const { setOriginalConfigs } = useContext(ConfigurationsService);

  const onAdd = ({
    item,
    successNotification,
  }: OnSubscriptionArgs<Configuration>) => {
    successNotification({
      title: NOTIFICATION.ADD_CONFIGURATION.TITLE,
      content: NOTIFICATION.ADD_CONFIGURATION.CONTENT.replace(
        CONFIGURATION_VARIABLE,
        item.name,
      ),
    });
    setOriginalConfigs(configs => [...configs, item]);
  };

  const onUpdate = ({
    item,
    successNotification,
  }: OnSubscriptionArgs<Configuration>) => {
    successNotification({
      title: NOTIFICATION.UPDATE_CONFIGURATION.TITLE,
      content: NOTIFICATION.UPDATE_CONFIGURATION.CONTENT.replace(
        CONFIGURATION_VARIABLE,
        item.name,
      ),
    });
    setOriginalConfigs(configs =>
      configs.map(c => (c.name === item.name ? { ...c, ...item } : c)),
    );
  };

  const onDelete = ({
    item,
    successNotification,
  }: OnSubscriptionArgs<Configuration>) => {
    successNotification({
      title: NOTIFICATION.DELETE_CONFIGURATION.TITLE,
      content: NOTIFICATION.DELETE_CONFIGURATION.CONTENT.replace(
        CONFIGURATION_VARIABLE,
        item.name,
      ),
    });
    setOriginalConfigs(configs => configs.filter(c => c.name !== item.name));
  };

  const subscription = currentNamespace
    ? ADDONS_CONFIGURATION_EVENT_SUBSCRIPTION
    : CLUSTER_ADDONS_CONFIGURATION_EVENT_SUBSCRIPTION;

  if (currentNamespace) {
    us({
      subscriptions: [
        {
          subscription,
          options: {
            variables: {
              namespace: currentNamespace,
            },
          },
          onAdd,
          onUpdate,
          onDelete,
        } as Subscription<
          Configuration,
          AddonsConfigurationSubscriptionVariables
        >,
      ],
    });
    return;
  }

  us({
    subscriptions: [
      {
        subscription,
        onAdd,
        onUpdate,
        onDelete,
      } as Subscription<Configuration>,
    ],
  });
};

const { Provider } = createUseContext(useSubscriptions);
export { Provider as SubscriptionsProvider };
