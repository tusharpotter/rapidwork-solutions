import { useState, useEffect } from "react";
import { getRequest } from "utils/api";

const _Limit = 6;

export function usePagination({ url, initialPage }) {
  const [assignments, setAssignments] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState();

  const [isLoading, setIsLoading] = useState(true);

  function getData(page) {
    setIsLoading(true);

    getRequest(`${url}?page=${page}`)
      .then((resp) => {
        setAssignments((prev) => {
          return { ...prev, [page]: resp.data.arrAssignments };
        });
        setCurrPage(page);
        setTotalPageCount(calcNumberOfPages(resp.data.arrAssignments[0].total_count));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function calcNumberOfPages(count) {
    return count % _Limit === 0 ? count / _Limit : parseInt(count / _Limit) + 1;
  }

  function handlePageChange(e, page) {
    getData(page);
  }

  function refreshList(page) {
    getRequest(`${url}?page=${page}`)
      .then((resp) => {
        setAssignments({ [page]: resp.data.arrAssignments });
        setCurrPage(page);
        setTotalPageCount(calcNumberOfPages(resp.data.arrAssignments[0].total_count));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData(initialPage);
  }, []);

  return {
    isLoading,
    assignments,
    currPage,
    handlePageChange,
    totalPageCount,
    refreshList,
  };
}
