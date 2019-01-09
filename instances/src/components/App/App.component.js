import React from 'react';
import { Modal, Notification } from '@kyma-project/react-components';

import DataProvider from '../DataProvider/DataProvider';
import RouteWrapper from './RouteWrapper';

Modal.MODAL_APP_REF = '#root';
const NOTIFICATION_VISIBILITY_TIME = 5000;

class App extends React.Component {
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

  render() {
    const modulesDisabled = this.props.modulesDisabled;
    const notificationQuery = this.props.notification;
    const notification = notificationQuery && notificationQuery.notification;
    if (notification) {
      this.scheduleClearNotification();
    }

    return (
      <div>
        <Notification {...notification} onClick={this.clearNotification} />
        <div className="ph3 pv1 background-gray">
          <DataProvider>{props => <RouteWrapper {...props} modulesDisabled={modulesDisabled} />}</DataProvider>
        </div>
      </div>
    );
  }
}

export default App;
