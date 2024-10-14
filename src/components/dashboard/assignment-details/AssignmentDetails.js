import React, { useState, useEffect } from "react";
import styles from "./AssignmentDetails.module.scss";

import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Download,
  Clock,
  Clipboard,
  ChevronDown,
  ArrowLeftCircle,
  Key,
  FileText,
  MessageSquare,
  DollarSign,
} from "react-feather";

import { getRequest, multiPostRequest, multiGetRequest } from "utils/api";
import config from "utils/config.json";

import ReviewDetails from "./ReviewDetails";
import Timeline from "./Timeline";
import DropZone from "components/shared/DropZone";
import Preloader from "components/shared/Preloader";
import BidModal from "components/dashboard/common/BidModal";
import ConfirmationModal from "components/dashboard/common/ConfirmationModal";
import { getStatusMessage } from "../helpers/functions";
import Navbar from "components/header/Navbar";

const AdminAssingmentsDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [assignment, setAssignment] = useState(null);
  const [fileUploads, setFileUploads] = useState([]);

  const params = useParams();
  const history = useHistory();
  const [toUpdateStatus, setToUpdateStatus] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState({
    placeBid: false,
    confirmation: false,
    openBidding: false,
    directAssign: false,
    viewBiddings: false,
    feedback: false,
    reviewSubmit: false,
  });

  function handleModal(data) {
    let toUpdate = { ...isOpenModal };
    for (const key in toUpdate) {
      if (key !== data.type) toUpdate[key] = false;
    }

    toUpdate[data.type] = !toUpdate[data.type];
    setIsOpenModal(toUpdate);

    if (data.status) setToUpdateStatus(data.status);
  }

  function handleSuccessModalAction() {
    setIsOpenModal((prev) => {
      let toUpdate = { ...prev };
      for (const key in toUpdate) toUpdate[key] = false;
      return toUpdate;
    });

    getAssignment();
  }

  function clickFileUrl(url) {
    window.open(`${config.baseUrl}/${url}`);
  }

  function handleGoBack() {
    history.goBack();
  }

  /* API CALLS *--------------------------------------------*/

  function getAssignment() {
    setIsLoading(true);
    getRequest(`/assignment/${params.assignmentId}`)
      .then((respAssignment) => {
        let parsedAssignment = { ...respAssignment.data };

        let arrUrl = [
          `/assignment/files/${params.assignmentId}`,
          `/reviews/${params.assignmentId}`,
          `/biddings/${params.assignmentId}`,
        ];

        multiGetRequest(arrUrl).then((resp) => {
          /* Parse each response */
          const respFiles = resp[0].data.arrFiles;
          const respReviews = resp[1].data.arrReviews;
          const respBiddings = resp[2].data.arrBiddings;

          /* Parse files by type */
          let files = { admin: [], freelancer: [], client: [], all: respFiles };
          respFiles.forEach((item) => files[item.type].push(item));

          parsedAssignment = {
            ...parsedAssignment,
            reviews: respReviews,
            biddings: respBiddings,
            files,
          };

          setAssignment(parsedAssignment);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleFileUpload(acceptedFile) {
    let filesWithPreview = acceptedFile.map((file) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setFileUploads((prev) => {
      return [...prev, ...filesWithPreview];
    });
  }

  function handleAdminFileUpload() {
    if (fileUploads.length) {
      setIsLoading(true);
      let fileApiConfigs = fileUploads.map((file) => {
        let uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("assignment_id", params.assignmentId);

        return { url: "/assignment/file", data: uploadFormData };
      });

      multiPostRequest(fileApiConfigs)
        .then((resp) => {
          toast.success("Files Uploaded");
          getAssignment();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error Occured. Please try again");
        })
        .finally(() => {
          setFileUploads([]);
          setIsLoading(false);
        });
    } else {
      toast.error("Please select a file to upload!");
    }
  }

  function renderStatusMessage() {
    const status = assignment.status;
    const { message, color } = getStatusMessage(status);

    return <p style={{ color }}>{message}</p>;
  }

  function renderCtas() {
    switch (assignment.status) {
      case 3:
        return <button onClick={handleModal.bind(this, { type: "placeBid" })}>Place a Bid</button>;
      case 5:
        return (
          <button onClick={handleModal.bind(this, { type: "reviewSubmit", status: 6 })}>
            Submit For Review
          </button>
        );
      case 7:
        return (
          <button onClick={handleModal.bind(this, { type: "resubmit", status: 6 })}>
            Resubmit
          </button>
        );
      case 11:
        return (
          <button onClick={handleModal.bind(this, { type: "resubmitClient", status: 12 })}>
            Resubmit
          </button>
        );

      default:
        return;
    }
  }

  useEffect(() => {
    getAssignment();
  }, []);

  return (
    <>
      <Navbar />

      {!isLoading && assignment ? (
        <div className={styles.wrapper}>
          <div className={styles.projectInfo}>
            <div className={styles.projectSummary}>
              <div className={styles.title}>
                <p>
                  <Key /> {assignment.uid.toUpperCase()}
                </p>
              </div>
              <div className={styles.column}>
                <div className={styles.row}>
                  <FileText /> Max Word Count <span>{assignment.max_words}</span>
                </div>
                <div className={styles.row}>
                  <DollarSign />
                  Project Budget
                  <span>
                    {assignment.admin_freelancer_quotation
                      ? `${assignment.currency} ${assignment.admin_freelancer_quotation}`
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <Clock />
                  Deadline :<span>{moment(assignment.deadline).format("DD MMMM YYYY")}</span>
                </div>

                <div className={styles.status}>{renderStatusMessage()}</div>
                <div className={styles.ctaWrapper}>{renderCtas()}</div>
              </div>
            </div>

            <div className={styles.projectContainer}>
              <div className={styles.description}>
                <p>
                  <Clipboard /> Project Description
                </p>
                <p>{assignment.description}</p>
              </div>
              {assignment.reviews.length ? (
                <div className={styles.reviewsWrapper}>
                  <p className={styles.title}>
                    <MessageSquare /> Reviews
                  </p>
                  <div className={styles.reviews}>
                    <ReviewDetails reviews={assignment.reviews} files={assignment.files} />
                  </div>
                </div>
              ) : null}
              <div className={styles.timelineWrapper}>
                <p className={styles.title}>
                  <Clock /> Timeline
                </p>
                {
                  <div className={styles.timeline}>
                    <Timeline assignment={assignment} />
                  </div>
                }
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.submissions}>
              <p className={styles.title}>
                <Clipboard />
                Available Files
              </p>
              <div className={styles.submissionFiles}>
                <div className={styles.file}>
                  <p className={styles.fileSectionTitle}>From Client</p>
                </div>

                {assignment.files.client.map((file) => {
                  return (
                    <div className={styles.file}>
                      <p onClick={clickFileUrl.bind(this, file.url)} className={styles.fileName}>
                        {file.original_name} <Download />
                      </p>
                    </div>
                  );
                })}

                <div className={styles.file}>
                  <p className={styles.fileSectionTitle}>Solution Uploaded</p>
                </div>

                {assignment.files.freelancer.map((file) => {
                  return (
                    <div className={styles.file}>
                      <p onClick={clickFileUrl.bind(this, file.url)} className={styles.fileName}>
                        {file.original_name} <Download />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.ctaWrapper}>{renderCtas()}</div>

            {assignment.status === 5 || assignment.status === 11 || assignment.status === 7 ? (
              <div className={styles.adminUpload}>
                <div className={styles.dropzoneWrapper}>
                  <DropZone
                    files={fileUploads}
                    onDrop={handleFileUpload}
                    dropzoneText="Click or drag & drop to upload files"
                  />
                </div>
                <button onClick={handleAdminFileUpload}>Upload</button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <Preloader />
      )}

      {/*  ---------------------------- Modals -------------------------------------------------------------- */}

      <BidModal
        isOpen={isOpenModal.placeBid}
        onClose={handleModal.bind(this, { type: "placeBid" })}
        data={{ assignment }}
        onSuccess={handleSuccessModalAction}
      />

      <ConfirmationModal
        isOpen={isOpenModal.reviewSubmit}
        onClose={handleModal.bind(this, { type: "reviewSubmit" })}
        data={{ assignment, status: toUpdateStatus }}
        onSuccess={handleSuccessModalAction}
        text="Are you sure you want to submit your assignment for review ?"
      />

      <ConfirmationModal
        isOpen={isOpenModal.resubmit}
        onClose={handleModal.bind(this, { type: "resubmit" })}
        data={{ assignment, status: toUpdateStatus }}
        onSuccess={handleSuccessModalAction}
        text="Are you sure you want to resubmit your assignment ?"
      />

      <ConfirmationModal
        isOpen={isOpenModal.resubmitClient}
        onClose={handleModal.bind(this, { type: "resubmitClient" })}
        data={{ assignment, status: toUpdateStatus }}
        onSuccess={handleSuccessModalAction}
        text="Are you sure you want to resubmit your assignment ?"
      />
    </>
  );
};

export default AdminAssingmentsDetails;
