import React from "react";
import styleCard from "./BaseCard.module.scss";

import { useHistory } from "react-router-dom";
import { getDeadlineTime } from "utils/helper";
import { Clock, CreditCard, Key } from "react-feather";

export default function BaseCard(props) {
  const history = useHistory();
  const { assignment } = props;

  function showAssignmentDetails(id) {
    history.push(`/dashboard/assignments/details/${id}`);
  }

  function getStatus(status) {
    switch (status) {
      // case 3:
      //   return { message: "Open to Bid", color: "orange" };
      // case 4:
      //   return { message: "Open to Bid", color: "green" };
      case 5:
        return { message: "Work in progress", color: "green" };
      case 6:
        return { message: "Submitted for review", color: "orange" };
      case 7:
        return { message: "Admin wants changes", color: "orange" };
      case 8:
        return { message: "Accepted. Waiting for Client review", color: "orange" };
      case 11:
        return { message: "Client wants changes", color: "green" };
      case 12:
        return { message: "Submitted for review", color: "green" };
      default:
        return {};
    }
  }

  return (
    <div
      className={`${styleCard.card} ${
        assignment.role_user_created && assignment.role_user_created === "admin"
          ? styleCard.adminCard
          : null
      }`}
    >
      <div className={styleCard.top}>
        <div className={styleCard.info}>
          <div className={`${styleCard.id} ${styleCard.row}`}>
            <div>
              <Key /> Key
            </div>
            <div>{assignment.uid.toUpperCase()}</div>
          </div>
          <div className={styleCard.divider}></div>
          <div className={`${styleCard.deadline} ${styleCard.row}`}>
            <div>
              <Clock /> Deadline
            </div>
            <div>{getDeadlineTime(assignment.deadline, assignment.time_zone)}</div>
          </div>
          <div className={styleCard.divider}></div>

          {(assignment.status === 3 || assignment.status === 4) && assignment.bidding_amount && (
            <React.Fragment>
              <div className={`${styleCard.adminAmountQuote} ${styleCard.row}`}>
                <div>
                  <CreditCard /> Bid Placed
                </div>
                <div>
                  {assignment.currency} {assignment.bidding_amount}
                </div>
              </div>
              <div className={styleCard.divider}></div>
            </React.Fragment>
          )}

          {assignment.admin_freelancer_quotation && (
            <React.Fragment>
              <div className={`${styleCard.adminAmountQuote} ${styleCard.row}`}>
                <div>
                  <CreditCard /> Quotation
                </div>
                <div>
                  {assignment.currency} {assignment.admin_freelancer_quotation}
                </div>
              </div>
              <div className={styleCard.divider}></div>
            </React.Fragment>
          )}

          <div
            className={styleCard.statusMsg}
            style={{ color: getStatus(assignment.status).color }}
          >
            {getStatus(assignment.status).message}
          </div>

          <div className={styleCard.pushRight}></div>
        </div>

        <div className={styleCard.controller}>
          {assignment.status === 5 ? null : (
            <button onClick={showAssignmentDetails.bind(this, assignment.uid)}>View Details</button>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
}
