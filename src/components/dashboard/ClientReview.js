import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import { usePagination } from "components/hooks/usePagination";

import BaseCard from "./BaseCard";
import Preloader from "components/shared/Preloader";
import Pagination from "components/shared/Pagination";
import PageTitle from "components/dashboard/common/PageTitle";
import NothingText from "components/dashboard/common/NothingText";
import ConfirmationModal from "components/dashboard/common/ConfirmationModal";

export default function ClientReview() {
  const [assignment, SetAssignment] = useState(null);
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
    url: "/assignments/freelancer/client_review",
    initialPage: queryString.get("page"),
  });

  function handleChangeConfirmModal(assignmentId) {
    setIsOpenConfirmationModal((prev) => !prev);
    console.log(assignmentId);
    if (assignmentId !== null && assignmentId !== undefined) SetAssignment(assignmentId);
  }

  function onSuccessHandler() {
    refreshList(currPage);
    setIsOpenConfirmationModal(false);
  }

  return (
    <div>
      {isLoadingPagination ? (
        <Preloader />
      ) : (
        <>
          <PageTitle title="Assignments - Client Review" />

          {assignments[currPage] && !assignments[currPage].length ? (
            <NothingText />
          ) : (
            <>
              {assignments[currPage] &&
                assignments[currPage].map((assignment) => (
                  <BaseCard assignment={assignment} key={assignment.uid}>
                    {assignment.status === 11 ? (
                      <button onClick={handleChangeConfirmModal.bind(this, assignment)}>
                        Resubmit
                      </button>
                    ) : null}
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
            data={{ assignment, status: 12 }}
            onSuccess={onSuccessHandler}
            text="Are you sure you want to resubmit assignment ?"
          />
        </>
      )}
    </div>
  );
}
