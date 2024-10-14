import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Timeline.module.scss";

import Modal from "components/shared/Modal";
import { ChevronsRight } from "react-feather";

import {
  getDateTimeForTimeline,
  sortArrOfObjectsByDate,
  getLocalTimeStamp,
  sortArrOfObjects,
} from "utils/helper";

export default function Timeline({ assignment }) {
  const [isBiddingsModalOpen, setIsBiddingsModalOpen] = useState(false);
  const [newTimeline, setNewTimeline] = useState([]);

  function toggleBiddingsModal() {
    setIsBiddingsModalOpen((prev) => !prev);
  }

  function parseTimeline() {
    let timelineArr = [];

    /* Step 1  - Bidding Opened */

    if (assignment.status >= 5 && !assignment.biddings.length) {
      timelineArr.push({
        pos: 1,
        title: "Work Assigned",
        hasHorizontalTimeline: false,
        date_time: assignment.bidding_accepted_time,
        ...getDateTimeForTimeline(assignment.bidding_accepted_time),
      });
    } else {
      timelineArr.push({
        pos: 1,
        title: "Bidding Opened",
        hasHorizontalTimeline: false,
        date_time: assignment.biddings[0].create_time,
        ...getDateTimeForTimeline(assignment.biddings[0].create_time),
      });

      timelineArr.push({
        pos: 2,
        title: "Bid Placed",
        subtitle: `${assignment.currency} ${assignment.biddings[0].amount}`,
        hasHorizontalTimeline: false,
        date_time: assignment.biddings[0].submit_time,
        ...getDateTimeForTimeline(assignment.biddings[0].submit_time),
      });

      /* Step 3 - Bid Accepted or direct assignment */

      timelineArr.push({
        pos: 3,
        title: "Bid Accepted. Work started",
        hasHorizontalTimeline: false,
        date_time: assignment.bidding_accepted_time,
        ...getDateTimeForTimeline(assignment.bidding_accepted_time),
      });
    }

    /* Step 4 - Admin Review */
    timelineArr.push({
      pos: 4,
      title: "Submission Admin Review",
      hasHorizontalTimeline: true,
      ...parseAdminReviews(),
    });

    /* Step 5 - Admin Accepted */
    timelineArr.push({
      pos: 5,
      title: "Admin accepted",
      HashChangeEvent: false,
      ...getDateTimeForTimeline(assignment.admin_review_accepted_time),
      date_time: assignment.admin_review_accepted_time,
    });
    // }

    /* Step 6 - Client Review */
    timelineArr.push({
      pos: 6,
      title: "Submission Client Review",
      hasHorizontalTimeline: true,
      ...parseClientReviews(),
    });

    /* Step 7 - Final Submission */
    timelineArr.push({
      pos: 7,
      title: "Client Accepted",
      hasHorizontalTimeline: false,
      date_time: assignment.client_review_accepted_time,
      ...getDateTimeForTimeline(assignment.client_review_accepted_time),
    });

    console.log(timelineArr);
    setNewTimeline(sortArrOfObjects(timelineArr, "pos", "asc"));
  }

  function parseAdminReviews() {
    let adminReviews = assignment.reviews.filter((f) => f.review_type === "admin");
    if (!adminReviews.length) return [{}];

    adminReviews = sortArrOfObjectsByDate(adminReviews, "time", "asc");
    let date_time = adminReviews[0].time;

    adminReviews.shift();
    adminReviews.shift();

    return {
      date_time,
      horizontalTimelineArr: adminReviews,
      ...getDateTimeForTimeline(date_time),
    };
  }

  function parseClientReviews() {
    let clientReviews = assignment.reviews.filter((f) => f.review_type === "client");

    if (!clientReviews.length) {
      return [{}];
    }

    clientReviews = sortArrOfObjectsByDate(clientReviews, "time", "asc");
    let date_time = clientReviews[1].time;

    clientReviews.shift();
    console.log(clientReviews);

    return {
      date_time,
      horizontalTimelineArr: clientReviews,
      ...getDateTimeForTimeline(date_time),
    };
  }

  useEffect(() => {
    parseTimeline();
  }, []);

  return (
    <div className={styles.wrapper}>
      {newTimeline.map((data) =>
        !data.hasHorizontalTimeline ? (
          <div key={data.pos} className={clsx(styles.block, !data.date_time && styles.inactive)}>
            <div className={styles.left}>
              <p>{data.date_time ? data.date : null}</p>
              <p>{data.date_time ? data.time : null}</p>
            </div>
            <div className={styles.divider}>
              <div className={styles.dot}>
                <span></span>
              </div>
            </div>
            <div className={styles.right}>
              <p>{data.title}</p>
              {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}
              {data.buttonText && <button onClick={data.onClick}>{data.buttonText}</button>}
            </div>
          </div>
        ) : (
          <div
            className={clsx(styles.block, styles.horizontal, !data.date_time && styles.inactive)}
          >
            <div className={styles.left}>
              <p>{data.date}</p>
              <p>{data.time}</p>
            </div>
            <div className={styles.divider}>
              <div className={styles.dot}>
                <span></span>
              </div>
            </div>
            <div className={styles.horizontalTimeline}>
              <div className={styles.right}>
                <p>{data.title}</p>
              </div>
              {data.date_time &&
                data.horizontalTimelineArr.map((review) => (
                  <>
                    <div className={styles.horizontalDivider} key={review.data_time}>
                      <ChevronsRight size={18} />
                    </div>
                    <div className={styles.right}>
                      <p>
                        {review.role === "client"
                          ? "Client Rejects"
                          : review.role === "freelancer"
                          ? "Resubmission"
                          : review.comment
                          ? "Changes Required"
                          : "Admin submission"}
                      </p>
                      <p className={styles.time}>{getLocalTimeStamp(review.time)}</p>
                    </div>
                  </>
                ))}
            </div>
          </div>
        )
      )}
      <Modal isOpen={isBiddingsModalOpen} onClose={toggleBiddingsModal} title="Biddings">
        <div className={styles.timelineBiddingsModal}>
          <div className={styles.header}>
            <p>Bidders</p>
            <p>Amount</p>
          </div>
          <div className={styles.biddings}>
            {assignment.biddings &&
              assignment.biddings.map((bid) => (
                <div className={clsx(styles.bid, bid.accepted && styles.accepted)} key={bid.uid}>
                  <p>
                    {bid.user_name} {bid.accepted && <span>(Accepted)</span>}
                  </p>
                  <p>{bid.amount ? bid.amount : 0}</p>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
