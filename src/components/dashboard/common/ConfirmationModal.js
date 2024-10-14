import React, { useState } from "react";
import style from "./SharedModals.module.scss";

import { toast } from "react-toastify";

import Modal from "components/shared/Modal";
import Preloader from "components/shared/Preloader";

import { putRequest } from "utils/api";

export default function ConfirmationModal({ isOpen, onClose, onSuccess, data, text }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function toggleCommentInput() {
    setShowCommentInput((prev) => !prev);
  }

  function handleSubmitModal(isAccept) {
    let putData = {
      assignment_id: data.assignment.uid,
      status: data.status,
    };
    if (showCommentInput) {
      putData.data = {
        comment: comment,
      };
    }
    setIsLoading(true);
    putRequest("/assignment/status", putData)
      .then(() => {
        toast.success("Assignment submitted for review");
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occured: Please try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <Modal isOpen={isOpen} title="Confirmation" onClose={onClose}>
      <div className={style.confirmationModal}>
        <div className={style.commentController}>
          <button
            onClick={toggleCommentInput}
            className={showCommentInput ? style.activeComment : null}
          >
            Add Comment
          </button>
        </div>
        {showCommentInput && (
          <div className={style.commentWrapper}>
            <textarea
              onChange={handleCommentChange}
              placeholder="Type your comment here..."
            ></textarea>
          </div>
        )}

        <div className={style.inputWrapper}>
          <p>{text}</p>
          <div>
            <button onClick={handleSubmitModal}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
