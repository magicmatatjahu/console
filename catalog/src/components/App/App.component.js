import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Modal, Notification } from '@kyma-project/react-components';
import LuigiClient from '@kyma-project/luigi-client';

import MainPage from '../Main/Main.container';
import ServiceClassDetails from '../ServiceClassDetails/ServiceClassDetails.container';

import { NotificationLink } from './styled';

Modal.MODAL_APP_REF = '#root';
const NOTIFICATION_VISIBILITY_TIME = 5000;

class App extends React.Component {
  static propTypes = {
    modulesDisabled: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    clearNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  scheduleClearNotification() {
    const { clearNotification } = this.props;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (typeof clearNotification === 'function') {
        clearNotification();
      }
    }, NOTIFICATION_VISIBILITY_TIME);
  }

  clearNotification = () => {
    clearTimeout(this.timeout);
    this.props.clearNotification();
  };

  goToServiceInstanceDetails = name => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate(`instances/details/${name}`);
  };

  render() {
    const modulesDisabled = this.props.modulesDisabled;
    const notificationQuery = this.props.notification;
    const notification = notificationQuery && notificationQuery.notification;
    if (notification) {
      this.scheduleClearNotification();
    }

    const MainPageWithRouter = withRouter(MainPage);
    const ServiceClassDetailsWithRouter = withRouter(ServiceClassDetails);

    return (
      <div>
        {notification && (
          <Notification
            {...notification}
            title={
              <NotificationLink
                onClick={() => {
                  this.goToServiceInstanceDetails(notification.instanceName);
                }}
              >
                {notification.title}
              </NotificationLink>
            }
            onClick={this.clearNotification}
          />
        )}
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <MainPageWithRouter />} />
            <Route exact path="/details/:name" render={() => <ServiceClassDetailsWithRouter modulesDisabled={modulesDisabled} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
