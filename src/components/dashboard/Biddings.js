import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import BaseCard from "./BaseCard";
import Pagination from "components/shared/Pagination";
import PageTitle from "components/dashboard/common/PageTitle";
import NothingText from "components/dashboard/common/NothingText";
import BidModal from "components/dashboard/common/BidModal";
import Preloader from "components/shared/Preloader";

import { usePagination } from "components/hooks/usePagination";

export default function OpenToBid() {
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [assignment, setAssignment] = useState(null);

  const urlLocation = useLocation();
  const queryString = new URLSearchParams(urlLocation.search);
  const {
    assignments,
    handlePageChange,
    currPage,
    totalPageCount,
    isLoading: isLoadingPagination,
    refreshList,
  } = usePagination({
    url: "/assignments/freelancer/biddings",
    initialPage: queryString.get("page"),
  });

  function handleChangeAcceptModal(assignment) {
    setIsOpenAcceptModal((prev) => !prev);
    if (assignment.uid) setAssignment(assignment);
    else setAssignment(null);
  }

  function onSuccessHandler() {
    refreshList(currPage);
    setIsOpenAcceptModal(false);
  }

  return isLoadingPagination ? (
    <Preloader />
  ) : (
    <>
      <PageTitle title="Open for bidding" />

      {assignments[currPage] && !assignments[currPage].length ? (
        <NothingText />
      ) : (
        <>
          {assignments[currPage] &&
            assignments[currPage].map((assignment) => (
              <BaseCard assignment={assignment}>
                {!assignment.bidding_amount && (
                  <button onClick={handleChangeAcceptModal.bind(this, assignment)}>
                    Place a Bid
                  </button>
                )}
              </BaseCard>
            ))}
          <Pagination
            currPage={currPage}
            handlePageChange={handlePageChange}
            count={totalPageCount}
          />
        </>
      )}

      <BidModal
        isOpen={isOpenAcceptModal}
        onClose={handleChangeAcceptModal}
        data={{ assignment }}
        OnSuccess={onSuccessHandler}
      />
    </>
  );
}
