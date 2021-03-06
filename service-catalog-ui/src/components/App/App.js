import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ServiceClassList from '../ServiceClassList/ServiceClassList';
import ServiceClassDetails from '../ServiceClassDetails/ServiceClassDetails';
import ServiceClassPlansList from '../ServiceClassPlansList/ServiceClassPlansList';
import ServiceInstancesList from '../ServiceInstanceList/ServiceInstanceList';
import ServiceInstancesDetails from '../ServiceInstanceDetails/ServiceInstanceDetails';
import ServiceBrokers from '../ServiceBrokers/ServiceBrokers';
import { NotificationProvider, withTitle } from 'react-shared';

import {
  CATALOG_TITLE,
  INSTANCES_TITLE,
  SERVICE_BROKERS_TITLE,
} from '../../shared/constants';

const App = () => (
  <NotificationProvider>
    <Switch>
      <Route path="/preload" component={() => null} />

      <Route
        exact
        path="/catalog"
        render={withTitle(CATALOG_TITLE, ServiceClassList)}
      />

      <Route
        exact
        path="/catalog/details/:name"
        render={withTitle(CATALOG_TITLE, RoutedCatalogDetails)}
      />
      <Route
        exact
        path="/catalog/details/:name/plan/:plan"
        render={withTitle(CATALOG_TITLE, RoutedCatalogDetails)}
      />
      <Route
        exact
        path="/catalog/details/:name/plans"
        render={withTitle(CATALOG_TITLE, RoutedServicePlanList)}
      />

      <Route
        exact
        path="/instances"
        render={withTitle(INSTANCES_TITLE, ServiceInstancesList)}
      />
      <Route
        exact
        path="/instances/details/:name"
        render={withTitle(INSTANCES_TITLE, ServiceInstancesDetails)}
      />

      <Route
        path="/brokers"
        render={withTitle(SERVICE_BROKERS_TITLE, ServiceBrokers)}
      />
    </Switch>
  </NotificationProvider>
);

const RoutedCatalogDetails = ({ match }) => (
  <ServiceClassDetails name={match.params.name} plan={match.params.plan} />
);

const RoutedServicePlanList = ({ match }) =>
  withTitle(CATALOG_TITLE, <ServiceClassPlansList name={match.params.name} />);

export default App;
