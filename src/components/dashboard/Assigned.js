import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { usePagination } from "components/hooks/usePagination";

import BaseCard from "./BaseCard";
import Preloader from "components/shared/Preloader";
import Pagination from "components/shared/Pagination";
import PageTitle from "components/dashboard/common/PageTitle";
import NothingText from "components/dashboard/common/NothingText";
import ConfirmationModal from "components/dashboard/common/ConfirmationModal";

export default function Assigned() {
  const [assignment, setAssignment] = useState(null);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const urlLocation = useLocation();
  const queryString = new URLSearchParams(urlLocation.search);
  const {
    assignments,
    handlePageChange,
    currPage,
    totalPageCount,
    isLoadingPagination,
    refreshList,
  } = usePagination({
    url: "/assignments/freelancer/assigned",
    initialPage: queryString.get("page"),
  });

  const history = useHistory();

  function handleChangeConfirmModal(assignment) {
    setIsOpenConfirmationModal((prev) => !prev);
    if (assignment !== null && assignment !== undefined) setAssignment(assignment);
  }

  function showAssignmentDetails(id) {
    history.push(`/dashboard/assignments/details/${id}`);
  }

  function onSuccessHandler() {
    refreshList(currPage);
    setIsOpenConfirmationModal(false);
  }

  return isLoadingPagination ? (
    <Preloader />
  ) : (
    <>
      <PageTitle title="Active assignments" />

      {assignments[currPage] && !assignments[currPage].length ? (
        <NothingText />
      ) : (
        <>
          {assignments[currPage] &&
            assignments[currPage].map((assignment) => (
              <BaseCard assignment={assignment} key={assignment.uid}>
                <button onClick={showAssignmentDetails.bind(this, assignment.uid)}>
                  View Details & Upload Files
                </button>
                <button onClick={handleChangeConfirmModal.bind(this, assignment)}>
                  Submit For Review
                </button>
              </BaseCard>
            ))}
          <Pagination
            currPage={currPage}
            handlePageChange={handlePageChange}
            count={totalPageCount}
          />
        </>
      )}

      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        onClose={handleChangeConfirmModal}
        data={{ assignment, status: 6 }}
        onSuccess={onSuccessHandler}
        text="Are you sure you want to submit your assignment for review ?"
      />
    </>
  );
}
