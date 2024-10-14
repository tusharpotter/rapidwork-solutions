import React from "react";
import "./App.css";

import { UserContextProvider } from "contexts/UserContextProvider";
import AppRouter from "./Router";
import { NotificationContextProvider } from "contexts/NotificationContextProvider";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

function App() {
  return (
    <UserContextProvider>
      <NotificationContextProvider>
        <AppRouter />
      </NotificationContextProvider>
    </UserContextProvider>
  );
}

export default App;
