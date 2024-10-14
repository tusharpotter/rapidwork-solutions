import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Home from "components/landing-page/Home";
import Login from "components/auth/Login";
import Register from "components/auth/Register";

import FreelancerNavigation from "components/dashboard/Navigation";
import FreelancerOpenToBid from "components/dashboard/Biddings";
import FreelancerAssigned from "components/dashboard/Assigned";
import FreelancerCompleted from "components/dashboard/Completed";
import FreelancerAdminReview from "components/dashboard/AdminReview";
import FreelancerClientReview from "components/dashboard/ClientReview";
import FreelancerAssignmentDetails from "components/dashboard/assignment-details/AssignmentDetails";

import { UserContext } from "contexts/UserContextProvider";
import { NotificationContext } from "contexts/NotificationContextProvider";
import { getFcmToken, messaging } from "./firebaseInit";
import { ToastContainer, toast } from "react-toastify";

export default function AppRouter() {
  const User = useContext(UserContext);
  const Notifications = useContext(NotificationContext);

  function isLoggedIn() {
    if ("authToken" in localStorage) return true;
    return false;
  }

  function checkAuth(Comp, isNav = true) {
    if (!isLoggedIn()) return <Redirect to="/login" />;

    return isNav ? (
      <FreelancerNavigation>
        <Comp />
      </FreelancerNavigation>
    ) : (
      <Comp />
    );
  }

  // ------------------------------------------------------------------------------------------------

  function renderFreelancerOpenToBid() {
    return checkAuth(FreelancerOpenToBid);
  }
  function renderFreelancerAssigned() {
    return checkAuth(FreelancerAssigned);
  }
  function renderFreelancerAdminReviews() {
    return checkAuth(FreelancerAdminReview);
  }
  function renderFreelancerClientReviews() {
    return checkAuth(FreelancerClientReview);
  }
  function renderFreelancerCompleted() {
    return checkAuth(FreelancerCompleted);
  }
  function renderFreelancerAssignmentDetails() {
    return checkAuth(FreelancerAssignmentDetails, false);
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

  function generateFcmToken() {
    getFcmToken()
      .then((fcmToken) => {
        if (fcmToken) User.setFcmToken(fcmToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function listenToNotification() {
    messaging.onMessage((payload) => {
      toast.success(payload.data.title);
      Notifications.getNotifications(1);
    });
  }

  useEffect(() => {
    generateFcmToken();
    listenToNotification();
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        autoClose={4000}
        rtl={false}
        pauseOnFocusLoss
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={getToastClassName}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/dashboard/assignments/biddings" render={renderFreelancerOpenToBid} />
        <Route exact path="/dashboard/assignments/assigned" render={renderFreelancerAssigned} />
        <Route
          exact
          path="/dashboard/assignments/admin_review"
          render={renderFreelancerAdminReviews}
        />
        <Route
          exact
          path="/dashboard/assignments/client_review"
          render={renderFreelancerClientReviews}
        />
        <Route exact path="/dashboard/assignments/completed" render={renderFreelancerCompleted} />
        <Route
          exact
          path="/dashboard/assignments/details/:assignmentId"
          render={renderFreelancerAssignmentDetails}
        />
      </Switch>
    </Router>
  );
}
