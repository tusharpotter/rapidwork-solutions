import React, { useState, createContext, useEffect } from "react";
import { getRequest, putRequest } from "../utils/api";
export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(null);
  const [readNotifications, setReadNotifications] = useState(null);

  const limit = 15;

  function getNotifications(page) {
    getRequest(`/notifications?limit=${limit}&page=${page}`)
      .then((res) => {
        setNotifications(res.data.arrNotifications);
      })
      .catch((err) => console.log(err));
  }

  function updateNotificationStatus(type) {
    if (type === "updateStatus") {
      let readNotifs = [];
      notifications.forEach((notif) => {
        if (notif.status === 0) {
          readNotifs.push(notif.uid);
        }
      });
      setReadNotifications(readNotifs);
      if (readNotifs.length) {
        let data = {
          arrNotificationIds: readNotifs,
          status: 1,
        };
        putRequest("/notifications/status", data)
          .then(() => {})
          .catch((err) => console.log(err));
      }
    } else if (type === "readAll") {
      let updateNotif = [...notifications];
      updateNotif.forEach((notif) => {
        if (notif.status === 0) {
          notif.status = 1;
        }
      });
      setNotifications(updateNotif);
    }
  }

  const value = {
    notifications,
    getNotifications,
    readNotifications,
    updateNotificationStatus,
  };

  useEffect(() => {
    if ("authToken" in localStorage) getNotifications(1);
  }, []);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
