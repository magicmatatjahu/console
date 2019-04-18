import { useState, useEffect } from "react";
import createContainer from "constate";

import { Notification } from "../types";
import { NOTIFICATION_SHOW_TIME } from "../constants";

const useNotifications = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false)
  let timer: number = 0;

  useEffect(
    () => {
      if (!notification) return;
      if (!Object.keys(notification).length) return;

      setShowNotification(true);
      let timer = setTimeout(() => setShowNotification(false), NOTIFICATION_SHOW_TIME)
      return () => {
        clearTimeout(timer)
      }
    },
    [notification]
  )

  const hideNotification = () => {
    setShowNotification(false);
    clearTimeout(timer);
  }

  return {
    notification,
    showNotification,
    setNotification,
    hideNotification,
  }
}

export default createContainer(useNotifications);
