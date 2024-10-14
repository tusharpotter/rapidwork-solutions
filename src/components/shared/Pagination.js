import React from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function BasicPagination(props) {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center", margin: "10px 0" }}>
      <Pagination
        page={parseInt(props.currPage)}
        onChange={props.handlePageChange}
        count={parseInt(props.count)}
      />
    </div>
  );
}
