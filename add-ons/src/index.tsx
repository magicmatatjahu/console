import React from 'react';
import { bootstrap, BackendModules } from '@kyma-project/common';
import App from './core/App';

import {
  QueriesProvider,
  MutationsProvider,
  FiltersProvider,
  ConfigurationsProvider,
  LabelsProvider,
  UrlsProvider,
  SubscriptionsProvider,
} from './services';

(async () => {
  const services = [
    QueriesProvider,
    MutationsProvider,
    FiltersProvider,
    ConfigurationsProvider,
    LabelsProvider,
    UrlsProvider,
    SubscriptionsProvider,
  ];

  await bootstrap({
    app: <App />,
    requiredBackendModules: [
      BackendModules.SERVICE_CATALOG,
      BackendModules.SERVICE_CATALOG_ADDONS,
    ],
    enableNotifications: true,
    services,
  });
})();
