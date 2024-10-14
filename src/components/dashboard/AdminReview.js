import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import BaseCard from "./BaseCard";
import Preloader from "components/shared/Preloader";

import { usePagination } from "components/hooks/usePagination";
import Pagination from "components/shared/Pagination";
import PageTitle from "components/dashboard/common/PageTitle";
import NothingText from "components/dashboard/common/NothingText";
import ConfirmationModal from "components/dashboard/common/ConfirmationModal";

export default function ModalReview() {
  const [isLoading, setIsLoading] = useState(false);
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
    url: "/assignments/freelancer/admin_review",
    initialPage: queryString.get("page"),
  });

  function handleChangeConfirmModal(assignment) {
    setIsOpenConfirmationModal((prev) => !prev);
    if (assignment !== null && assignment !== undefined) setAssignment(assignment);
  }

  function onSuccessHandler() {
    refreshList(currPage);
    setIsOpenConfirmationModal(false);
  }

  return (
    <div>
      {isLoading || isLoadingPagination ? (
        <Preloader />
      ) : (
        <>
          <PageTitle title="Assignments - Admin Review" />

          {assignments[currPage] && !assignments[currPage].length ? (
            <NothingText />
          ) : (
            <>
              {assignments[currPage] &&
                assignments[currPage].map((assignment) => (
                  <BaseCard assignment={assignment} key={assignment.uid}>
                    {assignment.status === 7 ? (
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
            data={{ assignment, status: 6 }}
            text="Are you sure you want to resubmit assignment ?"
            onSuccess={onSuccessHandler}
          />
        </>
      )}
    </div>
  );
}
