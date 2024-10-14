import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import style from "./Cancellation.module.scss";

function Cancellation() {
  const history = useHistory();
  function handleClickCancellation() {
    history.push("/policy/cancel");
  }
  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Refund Policy</title>
      </Helmet>
      <div className={style.navbar}></div>
      <div className={style.banner}>Our Refund Policy</div>
      <div className={style.content}>
        <div className={style.listCaption}>
          We at Ping Assignments are noble to our cause of satisfying the customer needs. We ensure that each and every
          data provided satisfies your needs are parallel with the Guarantee Policy. If at any point, we fail to do it,
          we have some refund policies. We urge you to take a look at them.
        </div>
        <ul>
          <li>
            Any dissatisfaction shown by the student after repeated revisions can be solved by contacting the customer
            service and filing a complaint.
          </li>
          <li>
            If you feel that the writer is taking too long to complete the assigned task, you can request for changing
            the writer.
          </li>
        </ul>
        <div className={style.listCaption}>For refund, please keep these points in mind</div>
        <ul>
          <li>Flaws in the work (mis-interpretation of the task)</li>
          <li>Not satisfied with the quality</li>
          <li>Time limit exceeded</li>
          <li>Overcharged due to technical glitch: the extra amount will be refunded</li>
          <li>Misbehaved by employees</li>
        </ul>
        <div className={style.disc}>
          Please make sure to raise an issue for refund within 7 days starting from the order date. Refund procedure
          will take time depending on the amount and situation. For cancelling your order, please check out{" "}
          <span onClick={handleClickCancellation}>Cancellation</span>
          Policy.
        </div>
      </div>
    </div>
  );
}

export default Cancellation;
