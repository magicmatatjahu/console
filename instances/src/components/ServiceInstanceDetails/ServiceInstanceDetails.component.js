import React from 'react';

import {
  NotificationMessage,
  Spinner,
  ThemeWrapper,
} from '@kyma-project/react-components';

import ServiceInstanceToolbar from './ServiceInstanceToolbar/ServiceInstanceToolbar.component';
import ServiceInstanceInfo from './ServiceInstanceInfo/ServiceInstanceInfo.component';
import ServiceInstanceBindings from './ServiceInstanceBindings/ServiceInstanceBindings.container';
import ServiceInstanceTabs from './ServiceInstanceTabs/ServiceInstanceTabs.component';

import { ServiceInstanceWrapper, EmptyList } from './styled';
import { transformDataScalarStringsToObjects } from '../../store/transformers';

class ServiceInstanceDetails extends React.Component {
  state = { defaultActiveTabIndex: 0 };

  callback = data => {
    this.setState({ ...data });
  };
  render() {
    const { serviceInstance = {}, deleteServiceInstance, history } = this.props;

    if (serviceInstance && serviceInstance.loading) {
      return (
        <EmptyList>
          <Spinner size="40px" color="#32363a" />
        </EmptyList>
      );
    }

    const instance =
      serviceInstance &&
      transformDataScalarStringsToObjects(serviceInstance.serviceInstance);
    const serviceClass =
      instance && (instance.serviceClass || instance.clusterServiceClass);

    if (!serviceInstance.loading && !instance) {
      return <EmptyList>Service Instance doesn't exist</EmptyList>;
    }

    return (
      <ThemeWrapper>
        <ServiceInstanceToolbar
          serviceInstance={instance}
          deleteServiceInstance={deleteServiceInstance}
          history={history}
        />

        <NotificationMessage
          type="error"
          title="Error"
          message={serviceInstance.error && serviceInstance.error.message}
        />

        <ServiceInstanceWrapper>
          <ServiceInstanceInfo serviceInstance={instance} />
          <ServiceInstanceBindings
            defaultActiveTabIndex={this.state.defaultActiveTabIndex}
            callback={this.callback}
            serviceInstance={instance}
          />
          {serviceClass && <ServiceInstanceTabs serviceClass={serviceClass} />}
        </ServiceInstanceWrapper>
      </ThemeWrapper>
    );
  }
}

export default ServiceInstanceDetails;
