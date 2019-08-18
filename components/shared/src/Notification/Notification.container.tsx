import React, { useContext } from 'react';

import { NotificationsService } from '@kyma-project/common';
import { Notification } from './Notification.component';

interface Props {
  orientation?: string;
}

export const NotificationContainer: React.FunctionComponent<Props> = ({
  orientation = 'bottom',
}) => {
  const { notification, showNotification, hideNotification } = useContext(
    NotificationsService,
  );

  return (
    <Notification
      {...notification}
      orientation={orientation}
      visible={showNotification}
      onClick={hideNotification}
    />
  );
};
