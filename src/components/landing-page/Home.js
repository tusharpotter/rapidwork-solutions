import React from "react";
import Landing from "./Landing";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.wrapper}>
      <Landing />
    </div>
  );
};

export default Home;
