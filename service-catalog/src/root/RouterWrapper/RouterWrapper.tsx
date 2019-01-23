import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { preload } from '../../common/loading-stategy';

class RouteWrapper extends Component {
  render() {
    const Catalog = preload(import(/* webpackChunkName: 'catalog' */ '../../modules/catalog/Catalog'));
    const Instances = preload(import(/* webpackChunkName: 'instances' */ '../../modules/instances/Instances'));
    const Brokers = preload(import(/* webpackChunkName: 'brokers' */ '../../modules/brokers/Brokers'));
    const ClusterBrokers = preload(import(/* webpackChunkName: 'cluster-brokers' */ '../../modules/cluster-brokers/ClusterBrokers'));

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/instances" component={Instances} />
          <Route exact path="/brokers" component={Brokers} />
          <Route exact path="/cluster-brokers" component={ClusterBrokers} />
        </Switch>
      </Suspense>
    );
  }
}

export default RouteWrapper;
