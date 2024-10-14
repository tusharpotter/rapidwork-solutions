import React, { useEffect, useState } from "react";
import styles from "./ReviewDetails.module.scss";

import clsx from "clsx";
import { Download } from "react-feather";

import Modal from "components/shared/Modal";

import config from "utils/config.json";
import { getLocalTimeStamp, capitaliseFirstLetter, sortArrOfObjectsByDate } from "utils/helper";

export default function ReviewDetails({ reviews, files }) {
  const [sortedReviews, setSortedReviews] = useState(null);
  const [parsedReviews, setParsedReviews] = useState(null);

  const [modal, setModal] = useState({
    files: [],
    isOpen: false,
  });

  function toggleModal() {
    setModal({
      files: [],
      isOpen: false,
    });
  }

  function clickFileUrl(url) {
    window.open(`${config.baseUrl}/${url}`);
  }

  async function splitReviews() {
    let payload = { client: {}, admin: {} };
    let adminReviews = await reviews.filter((f) => f.review_type === "admin");
    let clientReviews = await reviews.filter((f) => f.review_type === "client");

    /* ---- Parse Admin Review  ----------- */

    adminReviews.forEach((rvw) => {
      payload.admin[rvw.review_number_admin] = [];
    });

    adminReviews.forEach((rvw) => {
      payload.admin[rvw.review_number_admin].push(rvw);
    });

    for (const key in payload.admin) {
      payload.admin[key] = sortArrOfObjectsByDate(payload.admin[key], "time", "asc");

      // Only remove the first review entry by admin when work starts
      if (key == 0) payload.admin[key].shift();

      payload.admin[key].forEach((item) => {
        item.files = [];
        if (files.freelancer.length) {
          files.freelancer.forEach((file) => {
            if (
              file.review_number_admin === item.review_number_admin &&
              file.review_iteration_admin === item.review_iteration_admin
            )
              item.files.push(file);
          });
        }
      });
    }

    /* ---- Parse Client Review  ----------- */

    clientReviews.forEach((rvw) => {
      payload.client[rvw.review_number_client] = [];
    });

    clientReviews.forEach((rvw) => {
      payload.client[rvw.review_number_client].push(rvw);
    });

    for (const key in payload.client) {
      payload.client[key] = sortArrOfObjectsByDate(payload.client[key], "time", "asc");

      payload.client[key].forEach((item) => {
        item.files = [];
        if (files.freelancer.length) {
          files.all.forEach((file) => {
            if (
              file.review_type === "client" &&
              file.review_number_client === item.review_number_client &&
              file.review_iteration_client_client === item.review_iteration_client_client &&
              file.review_iteration_client_fl === item.review_iteration_client_fl
            )
              item.files.push(file);
          });
        }
      });
    }

    console.log(payload);
    setParsedReviews(payload);
  }

  // function setActiveFiles(review, type) {
  //   /* Find which (nth) null comment is this */
  //   console.log(review, type);
  //   let n = 0;
  //   for (let i = 0; i < sortedReviews[type].length; i++) {
  //     if (sortedReviews[type][i].comment === null) n++;
  //     if (sortedReviews[type][i].uid === review.uid) break;
  //   }

  //   let filesFound;
  //   if (type === "admin") {
  //     filesFound = files.freelancer.filter(
  //       (f) => f.review_number === n - 1 && f.review_type === "admin"
  //     );
  //   }

  //   setModal((prev) => {
  //     return { ...prev, files: filesFound };
  //   });
  // }

  function setActiveFiles(files) {
    setModal({
      files,
      isOpen: true,
    });
  }

  useEffect(() => {
    if (reviews && files) {
      splitReviews();
    }
  }, [reviews]);

  return (
    parsedReviews && (
      <div className={styles.wrapper}>
        {parsedReviews.admin && (
          <div className={styles.section}>
            <p className={styles.title}>Admin Reviews</p>
            <div className={styles.reviews}>
              {Object.entries(parsedReviews.admin).map((item) => (
                <div key={item[0]}>
                  <div className={styles.reviewNumber} key={item[0]}>
                    Review {parseInt(item[0]) + 1}
                  </div>
                  {item[1].map((review, index) => (
                    <div className={styles.review} key={review.uid}>
                      {review.role === "admin" ? (
                        <div className={styles.comment}>
                          <p>
                            "{review.comment}" ~ {"Admin"}
                          </p>
                        </div>
                      ) : (
                        <div className={clsx(styles.comment)}>
                          {review.comment && (
                            <p>
                              "{review.comment}" ~ {review.name}
                            </p>
                          )}
                          <p className={styles.submissionText}>
                            Submitted for review{" "}
                            <button onClick={setActiveFiles.bind(this, review.files)}>
                              View Files
                            </button>
                          </p>
                        </div>
                      )}
                      <div
                        className={clsx(
                          styles.actions,
                          index === item[1].length - 1 ? styles.end : null
                        )}
                      >
                        <p>{getLocalTimeStamp(review.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {parsedReviews.client && (
          <div className={styles.section}>
            <p className={styles.title}>Client Reviews</p>
            <div className={styles.reviews}>
              {Object.entries(parsedReviews.client).map((item) => (
                <>
                  <div className={styles.reviewNumber}>Review {item[0] + 1}</div>
                  {item[1].map((review, index) => (
                    <div className={styles.review} key={review.uid}>
                      {review.role === "client" ? (
                        <div className={styles.comment}>
                          <p>
                            "{review.comment}" ~ {capitaliseFirstLetter(review.role)}
                          </p>
                        </div>
                      ) : review.role === "admin" ? (
                        <div className={clsx(styles.comment)}>
                          {review.comment ? (
                            <p>"{review.comment}" ~ Admin</p>
                          ) : (
                            <p>
                              {capitaliseFirstLetter(review.role)} Submission
                              <button onClick={setActiveFiles.bind(this, review.files)}>
                                View Files
                              </button>
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className={clsx(styles.comment)}>
                          {review.comment && <p>"{review.comment}" ~ Myself</p>}
                          {review.files.length > 0 ? (
                            <p>
                              {capitaliseFirstLetter(review.role)} Submission
                              <button onClick={setActiveFiles.bind(this, review.files)}>
                                View Files
                              </button>
                            </p>
                          ) : null}
                        </div>
                      )}
                      <div
                        className={clsx(
                          styles.actions,
                          index === item[1].length - 1 ? styles.end : null
                        )}
                      >
                        <p>{getLocalTimeStamp(review.time)}</p>
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        )}

        <Modal isOpen={modal.isOpen} title="Files" onClose={toggleModal.bind(this, "close")}>
          <div className={styles.filesModal}>
            {modal.files.map((file, index) => (
              <p onClick={clickFileUrl.bind(this, file.url)}>
                <span>{index + 1})</span>
                {file.original_name} <Download />
              </p>
            ))}
          </div>
        </Modal>
      </div>
    )
  );
}
