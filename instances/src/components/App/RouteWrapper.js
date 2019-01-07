import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Spinner } from '@kyma-project/react-components';

import ServiceInstances from '../ServiceInstances/ServiceInstances.container';
import ServiceInstanceDetails from '../ServiceInstanceDetails/ServiceInstanceDetails.container';
import { EmptyList } from '../ServiceInstanceDetails/styled';

class RouteWrapper extends React.Component {
  componentDidMount() {
    if (typeof this.props.subscribeToEvents === 'function') {
      this.props.subscribeToEvents();
    }
  }

  render() {
    const { serviceInstances, modulesDisabled } = this.props;

    if (serviceInstances.loading) {
      return (
        <EmptyList>
          <Spinner size="40px" color="#32363a" />
        </EmptyList>
      );
    }

    // if (serviceInstances.error) {
    //   return (
    //     <NotificationMessage
    //       type="error"
    //       title="Error"
    //       message={serviceInstances.error && serviceInstances.error.message}
    //     />
    //   );
    // }

    const ServiceInstancesWithRouter = withRouter(ServiceInstances);
    const ServiceInstanceDetailsWithRouter = withRouter(ServiceInstanceDetails);

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" render={() => <ServiceInstancesWithRouter modulesDisabled={modulesDisabled} />} />
          <Route
            exact
            path="/details/:name"
            render={() => <ServiceInstanceDetailsWithRouter modulesDisabled={modulesDisabled} />}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default RouteWrapper;
