import React, { useState, useEffect, useContext } from "react";
import style from "./Navigation.module.scss";

import clsx from "clsx";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Edit,
  ChevronDown,
  ChevronRight,
  X,
  Activity,
  Briefcase,
  Box,
  Download,
  RotateCcw,
  DollarSign,
  Bell,
  Check,
  Edit2,
  Gift,
} from "react-feather";
import "react-toastify/dist/ReactToastify.css";
import { getLocalTimeStamp } from "utils/helper";
import Navbar from "components/header/Navbar";

import { UserContext } from "contexts/UserContextProvider";
import { NotificationContext } from "contexts/NotificationContextProvider";
import logo from "assets/images/logo.png";

const Navigation = (props) => {
  const [activeTab, setActiveTab] = useState("/dashboard/assignments/biddings");
  const [showProfile, setShowProfile] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const User = useContext(UserContext);
  const Notifications = useContext(NotificationContext);

  function navigateTo(route) {
    history.push(route);
    setActiveTab(route);
  }

  function handleShowProfile() {
    setShowProfile((prev) => !prev);
  }

  function handleClickAwayProfile() {
    setShowProfile(false);
  }

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  function handleClickAwayNotifContainer() {
    setIsNotifOpen((prev) => !prev);
  }

  function highlightAssignmentId(notif) {
    let string = notif.body;
    // let findId = string.match(/#(\S+)/);
    // let newString = string.replace(
    //   findId[0],
    //   `<span style="color: ${getColorForNotification(notif)}"> ${findId[0]}</span>`
    // );
    return string;
  }

  function getColorForNotification(notif) {
    switch (notif.title) {
      case "Bidding opened":
        return "#5a65f5";
      case "Bid accepted":
        return "#ffb700";
      case "Submission accepted":
        return "#1C7947";
      case "Client accepted the assignment":
        return "#A6D07D";
      default:
        return "#3db6f2";
    }
  }

  function getIconForNotification(notif) {
    switch (notif.title) {
      case "Bidding opened":
        return <Gift size={18} color={getColorForNotification(notif)} />;
      case "Bid accepted":
        return <DollarSign size={18} color={getColorForNotification(notif)} />;
      case "Submission accepted":
        return <Edit2 size={18} color={getColorForNotification(notif)} />;
      case "Client accepted the assignment":
        return <Check size={18} color={getColorForNotification(notif)} />;
      default:
        return <DollarSign size={18} color={getColorForNotification(notif)} />;
    }
  }

  function getToastClassName(value) {
    let baseClassName = "Toastify__toast";
    switch (value.type) {
      case "error":
        return `${baseClassName} toast-error`;
      case "success":
        return `${baseClassName} toast-success-freelancer`;
      default:
        return null;
    }
  }

  useEffect(() => {
    setActiveTab(location.pathname.split("/")[3]);
  }, [location]);

  return (
    <div className={style.wrapper}>
      <div className={`${style.sidebar} ${isOpen ? style.mobileSidebar : null}`}>
        <button
          className={style.closeSidebar}
          onClick={() => {
            setOpen(false);
          }}
        >
          <X />
        </button>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={style.menu}>
          <button
            className={activeTab === "biddings" ? style.active : null}
            onClick={navigateTo.bind(this, "/dashboard/assignments/biddings?page=1")}
          >
            <Briefcase /> Open for Bidding
          </button>
          <button
            className={activeTab === "assigned" ? style.active : null}
            onClick={navigateTo.bind(this, "/dashboard/assignments/assigned?page=1")}
          >
            <Activity /> Assigned Assignments
          </button>
          <button
            className={activeTab === "admin_review" ? style.active : null}
            onClick={navigateTo.bind(this, "/dashboard/assignments/admin_review?page=1")}
          >
            <Edit /> Admin Review
          </button>
          <button
            className={activeTab === "client_review" ? style.active : null}
            onClick={navigateTo.bind(this, "/dashboard/assignments/client_review?page=1")}
          >
            <Edit /> Client Review
          </button>
          <button
            className={activeTab === "completed" ? style.active : null}
            onClick={navigateTo.bind(this, "/dashboard/assignments/completed?page=1")}
          >
            <Box /> Completed
          </button>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.navbar}>
          <Navbar />
        </div>
        <div className={style.appContainer}>{props.children}</div>
      </div>
    </div>
  );
};

export default Navigation;
