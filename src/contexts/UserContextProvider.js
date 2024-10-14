import React, { useState, useEffect, createContext } from "react";
import { getRequest } from "utils/api";
import Preloader from "components/shared/Preloader";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fcmToken, setFcmToken] = useState(null);

  function getUserData() {
    setIsLoading(true);
    getRequest("/user/profile")
      .then((resp) => {
        setProfile(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function refresh() {
    getUserData();
  }

  const value = {
    profile,
    refresh,
    fcmToken,
    setFcmToken,
  };

  useEffect(() => {
    if ("authToken" in localStorage) getUserData();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {isLoading ? <Preloader /> : <>{children}</>}
    </UserContext.Provider>
  );
}
