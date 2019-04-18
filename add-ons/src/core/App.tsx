import React from 'react';
import {
  BackendModuleDisabled,
} from '@kyma-project/react-components';

import Notification from "../components/Notification/container"
import Toolbar from "../components/Toolbar/Toolbar.component"
import Table from "../components/Table/Table.container"

import nestServices from "../services/nest";
import NotificationsService from "../services/Notifications.service";
import QueriesService from "../services/Queries.service";
import MutationsService from "../services/Mutations.service";
import SubscriptionsService from "../services/Subscriptions.service";
import FiltersService from "../services/Filters.service";
import ConfigurationsService from "../services/Configurations.service";
import LabelsService from "../services/Labels.service";
import UrlsService from "../services/Urls.service";

import appInitializer from "./app-initializer";
import { 
  BACKEND_MODULE_SERVICE_CATALOG,
  BACKEND_MODULE_SERVICE_CATALOG_DISPLAY_NAME
 } from "../constants";

import {
  Wrapper,
} from "./styled";

const Services = nestServices(
  NotificationsService.Provider,
  QueriesService.Provider,
  MutationsService.Provider,
  FiltersService.Provider,
  ConfigurationsService.Provider,
  LabelsService.Provider,
  UrlsService.Provider,
  SubscriptionsService.Provider,
);

const App: React.FunctionComponent = () => {
  if (!appInitializer.backendModuleExists(BACKEND_MODULE_SERVICE_CATALOG)) {
    return <BackendModuleDisabled mod={BACKEND_MODULE_SERVICE_CATALOG_DISPLAY_NAME} />;
  }

  return (
    <Wrapper>
      <Services>
        <Notification />
        <Toolbar />
        <Table />
      </Services>
    </Wrapper>
  );
}

export default App;
