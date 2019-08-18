import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import 'fiori-fundamentals/dist/fiori-fundamentals.min.css';

import { BackendModulesDisabled } from './containers';
import {
  nestServices,
  GlobalProvider,
  NotificationsProvider,
  BackendModules,
} from './services';

import { createApolloClient, QueriesOptions, MutationsOptions } from './gql';

import { appInitializer } from './core';

interface BootstrapOptions {
  app: React.ReactNode;
  requiredBackendModules?: BackendModules[];
  id?: string;
  enableNotifications?: boolean;
  enableSubscriptions?: boolean;
  services?: React.FunctionComponent[];
  queriesOptions?: QueriesOptions;
  mutationsOptions?: MutationsOptions;
}

export const bootstrap = async ({
  id = 'root',
  requiredBackendModules = [],
  enableNotifications = false,
  enableSubscriptions = false,
  app,
  services: svcs,
}: BootstrapOptions) => {
  const { backendModules, ...context } = await appInitializer.init();

  if (
    requiredBackendModules &&
    !requiredBackendModules.every(mod => backendModules.includes(mod))
  ) {
    render(
      <BackendModulesDisabled modules={requiredBackendModules} />,
      document.getElementById(id),
    );
    return;
  }

  const client = createApolloClient({
    enableSubscriptions: Boolean(enableSubscriptions),
  });

  const services: any[] = [GlobalProvider];
  if (enableNotifications) {
    services.push(NotificationsProvider);
  }
  if (svcs) {
    services.push(...svcs);
  }
  const Services = nestServices(...services);

  render(
    <ApolloProvider client={client}>
      <Services backendModules={backendModules} {...context}>
        {app}
      </Services>
    </ApolloProvider>,
    document.getElementById(id),
  );
};
