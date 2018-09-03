import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import {
  NotificationWrapper,
  NotificationHeader,
  NotificationTitleWrapper,
  NotificationIconWrapper,
} from './components';

const Notification = ({ title, color, icon, onClick, visible }) => (
  <NotificationWrapper color={color} onClick={onClick} visible={visible}>
    <NotificationHeader>
      <NotificationTitleWrapper>{title}</NotificationTitleWrapper>
      <NotificationIconWrapper>
        <Icon color={color} icon={icon} />
      </NotificationIconWrapper>
    </NotificationHeader>
  </NotificationWrapper>
);

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Notification;
