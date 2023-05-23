import ReactPaginate from "react-paginate";

import "./Pagination.scss";
import { BtnArrowNext, BtnArrowPrev } from "../../ui/BtnArrow/BtnsArrow";

export const Pagination = ({ pageCount, callbackFun, initialPage }) => {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<BtnArrowNext />}
        onPageChange={callbackFun}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        forcePage={initialPage}
        previousLabel={<BtnArrowPrev />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="pagination-item"
        pageLinkClassName="pagination-link"
        activeClassName="pagination-item_active"
        disabledClassName="disabled-button"
        previousClassName="btn"
        nextClassName="btn"
      />
    </>
  );
};
