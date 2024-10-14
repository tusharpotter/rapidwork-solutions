import React, { useState } from "react";
import style from "./SharedModals.module.scss";

import { toast } from "react-toastify";

import Modal from "components/shared/Modal";
import Preloader from "components/shared/Preloader";

import { putRequest } from "utils/api";

export default function BidModal({ isOpen, onClose, OnSuccess, data }) {
  const [currBiddingAmount, setCurrBiddingAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeBiddingAmount(e) {
    setCurrBiddingAmount(e.target.value);
  }

  function handleSubmitBiddingAmount(e) {
    e.preventDefault();
    setIsLoading(true);
    let payload = {
      assignment_id: data.assignment.uid,
      status: 4,
      data: { amount: currBiddingAmount },
    };

    putRequest("/assignment/status", payload)
      .then(() => {
        toast.success("Bid submitted");
        OnSuccess();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occured. Please try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <Modal isOpen={isOpen} title="Accept Bidding" onClose={onClose}>
      <div className={style.bidModalWrapper}>
        <div className={style.form}>
          <form onChange={handleChangeBiddingAmount} onSubmit={handleSubmitBiddingAmount}>
            <label>Please enter a bid amount</label>
            <div className={style.inputBid}>
              <p>{data.assignment && data.assignment.currency}</p>
              <input type="number" name="amount" />
            </div>
          </form>
        </div>
        <div className={style.controller}>
          <button onClick={handleSubmitBiddingAmount}>Submit</button>
        </div>
      </div>
    </Modal>
  );
}
