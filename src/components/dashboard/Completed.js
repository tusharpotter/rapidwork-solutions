import React from "react";

import { useLocation } from "react-router-dom";

import BaseCard from "./BaseCard";
import Preloader from "components/shared/Preloader";
import Pagination from "components/shared/Pagination";

import { usePagination } from "components/hooks/usePagination";
import PageTitle from "components/dashboard/common/PageTitle";
import NothingText from "components/dashboard/common/NothingText";

export default function Review() {
  const urlLocation = useLocation();
  const queryString = new URLSearchParams(urlLocation.search);
  const { assignments, handlePageChange, currPage, totalPageCount, isLoadingPagination } =
    usePagination({
      url: "/assignments/freelancer/closed",
      initialPage: queryString.get("page"),
    });

  return isLoadingPagination ? (
    <Preloader />
  ) : (
    <>
      <PageTitle title="Completed Assignments" />
      {assignments[currPage] && !assignments[currPage].length ? (
        <NothingText />
      ) : (
        assignments[currPage] && (
          <>
            {assignments[currPage].map((assignment) => (
              <BaseCard assignment={assignment} key={assignment.uid}></BaseCard>
            ))}
            <Pagination
              currPage={currPage}
              handlePageChange={handlePageChange}
              count={totalPageCount}
            />
          </>
        )
      )}
    </>
  );
}
