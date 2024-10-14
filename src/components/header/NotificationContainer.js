import React, { useState, useEffect, useContext } from "react";
import style from "./NotificationContainer.module.scss";

import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { Bell, Activity, RotateCcw, Download, DollarSign } from "react-feather";
import ClickAwayListener from "react-click-away-listener";
import ReactHtmlParser from "react-html-parser";

import { NotificationContext } from "contexts/NotificationContextProvider";
import { getLocalTimeStamp } from "utils/helper";
import { putRequest } from "utils/api";

export default function Notification() {
  const Notifications = useContext(NotificationContext);
  const history = useHistory();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  function handleClickAwayNotifContainer() {
    setIsNotifOpen((prev) => false);
  }

  function highlightAssignmentId(notif) {
    let string = notif.body;
    let findId = string.match(/#(\S+)/);
    let newString = string.replace(
      findId[0],
      `<span style="color: ${getColorForNotification(notif)}"> ${findId[0]}</span>`
    );
    return newString;
  }

  function getColorForNotification(notif) {
    switch (notif.title) {
      case "Work started for your assignment":
        return "#ffb700";
      case "Submission Recieved":
        return "#A6D07D";
      case "Resubmission Recieved":
        return "#C56824";
      default:
        return "#3db6f2";
    }
  }

  function getIconForNotification(notif) {
    switch (notif.title) {
      case "Work started for your assignment":
        return <Activity size={18} color={getColorForNotification(notif)} />;
      case "Submission Recieved":
        return <Download size={18} color={getColorForNotification(notif)} />;
      case "Resubmission Recieved":
        return <RotateCcw size={18} color={getColorForNotification(notif)} />;
      default:
        return <DollarSign size={18} color={getColorForNotification(notif)} />;
    }
  }

  function handleClickNotification(assId) {
    history.push(`/assignments/details/${assId}`);
  }

  function markNotificationsAsRead() {
    let payload = [];
    Notifications.notifications.forEach((notif) => {
      if (notif.status === 0) {
        payload.push(notif.uid);
      }
    });
    if (payload.length) {
      putRequest("/notifications/status", {
        arrNotificationIds: payload,
        status: 1,
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (Notifications.notifications && isNotifOpen) {
      markNotificationsAsRead();
    }
  }, [Notifications.notifications, isNotifOpen]);

  return (
    <div className={style.wrapper}>
      <Bell onClick={() => setIsNotifOpen((prev) => !prev)} />

      {isNotifOpen && (
        <ClickAwayListener onClickAway={handleClickAwayNotifContainer}>
          <div className={style.notificationsListContainer}>
            <div className={style.title}>Notifications</div>

            {Notifications.notifications &&
              Notifications.notifications.map((notif, index) => (
                <>
                  <div
                    onClick={handleClickNotification.bind(this, notif.assignment_id)}
                    className={clsx(
                      style.notifItem
                      // notif.status === 0 ? style.unread : null
                    )}
                  >
                    <div className={style.icon}>{getIconForNotification(notif)}</div>
                    <div className={style.body}>
                      <div className={style.text}>
                        {ReactHtmlParser(highlightAssignmentId(notif))}
                      </div>
                      <div className={style.time}>{getLocalTimeStamp(notif.create_time)}</div>
                    </div>
                  </div>
                  <div
                    className={index !== Notifications.notifications.length - 1 && style.divider}
                  ></div>
                </>
              ))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
