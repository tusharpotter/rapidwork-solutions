import React, { useContext, useState, useEffect } from "react";
import style from "./Navbar.module.scss";
import { useLocation, useHistory } from "react-router-dom";

import { Fade as Hamburger } from "hamburger-react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ChevronDown, ChevronRight, ArrowLeftCircle } from "react-feather";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "contexts/UserContextProvider";
import Notification from "./NotificationContainer";
import clsx from "clsx";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const User = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [isDetailsPage, setIsDetailsPage] = useState(false);

  const location = useLocation();
  const history = useHistory();

  function goBack() {
    history.goBack();
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

  useEffect(() => {
    let pathArr = location.pathname.split("/");
    if (pathArr.indexOf("details") !== -1) {
      setIsDetailsPage(true);
    }
  }, [location]);

  return (
    <div className={clsx(style.wrapper, isDetailsPage && style.maxWidthContainer)}>
      <div className={style.hamburger}>
        <Hamburger
          hideOutline={false}
          color="#616161"
          toggled={isSidebarOpen}
          toggle={setIsSidebarOpen}
          size={28}
        />
      </div>

      {isDetailsPage && (
        <div className={style.back}>
          <button onClick={goBack}>
            <ArrowLeftCircle /> Back
          </button>
        </div>
      )}

      <h3>Freelancer Dashboard</h3>
      <div className={style.controls}>
        <ClickAwayListener onClickAway={handleClickAwayProfile}>
          <div className={style.clickAwayListener}>
            <Notification />
            <div className={style.profilePicContainer}></div>
            <div className={style.control}>
              {User.profile ? (
                <button onClick={handleShowProfile}>
                  {User.profile.name}
                  {showProfile ? <ChevronDown /> : <ChevronRight />}
                </button>
              ) : null}
            </div>
            {showProfile ? (
              <div className={style.dropdown}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
}
