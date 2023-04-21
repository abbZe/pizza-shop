import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, setCurrentPage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => setCurrentPage(e.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
    forcePage={currentPage - 1}
  />
);

export default Pagination;
