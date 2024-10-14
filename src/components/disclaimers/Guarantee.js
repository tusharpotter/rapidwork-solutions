import React from "react";
import { Helmet } from "react-helmet";
import style from "./Cancellation.module.scss";

function Cancellation() {
  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Guarantee Policy</title>
      </Helmet>
      <div className={style.navbar}></div>
      <div className={style.banner}>Our Guarantee Policy</div>
      <div className={style.content}>
        <div className={style.row}>
          <div>Experienced Writers</div>
          <div>
            Our writers are trained by experts. They are selected after a series of assessments and interviews. The
            quality of work is never compromised by us and our writers do exactly right by us and Ping Assignments by
            delivering each and every content efficiently without any complaints.
          </div>
        </div>
        <div className={style.row}>
          <div>Non-Plagiarized Content</div>
          <div>
            Ping Assignments is strictly against plagiarism. We ensure that the content which reaches to our customers
            are checked thoroughly. Our work is apt and true.
          </div>
        </div>
        <div className={style.row}>
          <div>Turnitin Report for free</div>
          <div>
            We are registered at Turnitin. In order to give assurance about our work, we provide free Turnitin report
            proving the content as non-plagiarized.
          </div>
        </div>
        <div className={style.row}>
          <div>Owning the Content</div>
          <div>
            We at Ping Assignments make sure that none of the content, provided to you by us is disclosed to anyone. We
            believe in trust and integrity. We maintain our ethics of giving the content to the customers with full
            ownership.
          </div>
        </div>
        <div className={style.row}>
          <div>Discounts on becoming a member</div>
          <div>
            We have special discounts for our members. Membership discounts include ‘Discount on becoming a new member’,
            ‘Heavy order discounts’, ‘Time period discount-say you want assignments for a complete semester or a
            complete year’.
          </div>
        </div>
        <div className={style.row}>
          <div>Unlimited Revision and Amendment</div>
          <div>
            We guarantee you for taking up unlimited revision. You can demand changes as many times as you want even
            after the delivery of the content. Also, if any part of the content is mis-interpreted by our writers, we
            will make sure to amend the same.
          </div>
        </div>
        <div className={style.row}>
          <div>24*7 Customer Service</div>
          <div>
            We believe in being available for our customers all the time. So, we have employees available 24*7 for you
            to clear your doubts and queries. Feel free to contact us at any time.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancellation;
