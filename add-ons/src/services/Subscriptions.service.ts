import { useContext } from "react";
import gql from 'graphql-tag';
import createContainer from "constate";
import { useSubscription } from 'react-apollo-hooks';

import NotificationsService from "./Notifications.service";
import ConfigurationsService from "./Configurations.service";

import appInitializer from "../core//app-initializer";
import { Configuration, Notification } from '../types';
import { SubscriptionType } from './types';
import { KYMA_SYSTEM_ENV, NOTIFICATION, CONFIGURATION_VARIABLE } from "../constants";

export const ADDONS_CONFIGURATION_EVENT_SUBSCRIPTION = gql`
  subscription addonsConfigurationEvent {
    addonsConfigurationEvent {
      type
      addonsConfiguration {
        name
        labels
        urls
      }
    }
  }
`;

const useSubscriptions = () => {
  const { setNotification } = useContext(NotificationsService.Context);
  const { setOriginalConfigs } = useContext(ConfigurationsService.Context);

  const onAdd = (config: Configuration) => {
    setNotification({
      title: NOTIFICATION.ADD_CONFIGURATION.TITLE,
      content: NOTIFICATION.ADD_CONFIGURATION.CONTENT.replace(CONFIGURATION_VARIABLE, config.name),
      color: '#359c46',
      icon: 'accept',
    })
    setOriginalConfigs(configs => [...configs, config]);
  }

  const onUpdate = (config: Configuration) => {
    setNotification({
      title: NOTIFICATION.UPDATE_CONFIGURATION.TITLE,
      content: NOTIFICATION.UPDATE_CONFIGURATION.CONTENT.replace(CONFIGURATION_VARIABLE, config.name),
      color: '#359c46',
      icon: 'accept',
    })
    setOriginalConfigs(configs => configs.map(c => c.name === config.name ? { ...c, ...config } : c ));
  }

  const onDelete = (config: Configuration) => {
    setNotification({
      title: NOTIFICATION.DELETE_CONFIGURATION.TITLE,
      content: NOTIFICATION.DELETE_CONFIGURATION.CONTENT.replace(CONFIGURATION_VARIABLE, config.name),
      color: '#359c46',
      icon: 'accept',
    })
    setOriginalConfigs(configs => configs.filter(c => c.name !== config.name));
  }

  const { data, error, loading } = useSubscription(
    ADDONS_CONFIGURATION_EVENT_SUBSCRIPTION,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        const { data: { addonsConfigurationEvent: { type, addonsConfiguration } }, error } = subscriptionData;

        if (error) {
          console.error(error);
          return;
        }

        switch(type) {
          case SubscriptionType.ADD: {
            onAdd(addonsConfiguration)
            break;
          }
          case SubscriptionType.UPDATE: {
            onUpdate(addonsConfiguration)
            break;
          }
          case SubscriptionType.DELETE: {
            onDelete(addonsConfiguration)
            break;
          }
          default: break;
        }
      }
    }
  );
}

export default createContainer(useSubscriptions);
