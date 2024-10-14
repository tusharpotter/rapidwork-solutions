import React from "react";
import { Helmet } from "react-helmet";
import style from "./Cancellation.module.scss";

function Cancellation() {
  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Cancellation Policy</title>
      </Helmet>
      <div className={style.navbar}></div>
      <div className={style.banner}>Cancellation Policy</div>
      <div className={style.content}>
        <div className={style.title}>Our cancellation policy depends upon the following norms: </div>
        <div className={style.listCaption}>You can cancel your order if:</div>
        <ul>
          <li> Writers are not available to take up your task</li>
          <li>We are unable to deliver the content on time</li>
        </ul>
        <div className={style.listCaption}>Ping Assignments can cancel your order if:</div>
        <ul>
          <li>There is any breach of the agreement</li>
          <li> False allegations against our employees or our organization </li>
        </ul>
      </div>
    </div>
  );
}

export default Cancellation;
