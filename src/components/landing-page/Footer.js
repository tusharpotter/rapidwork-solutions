import React from "react";
import style from "./Footer.module.scss";

function Footer() {
  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.left}>
          <div className={style.logoContainer}></div>
          <div className={style.text}>Solution to Every Assignment</div>
        </div>
        <div className={style.mid}>
          <div className={style.col}>
            <div>Useful Links</div>
            <ul>
              <li>About Us</li>
              <li>Our Services</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className={style.col}>
            <div>Policies</div>
            <ul>
              <li>Cancellation Policy</li>
              <li>Guarantee Policy</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style.bottom}>Copyright © 2012-21 Ping Assignments | All Rights Reserved</div>
    </div>
  );
}

export default Footer;
