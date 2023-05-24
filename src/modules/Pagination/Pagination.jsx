import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import { useState } from "react";

import "./Pagination.scss";
import { BtnArrowNext, BtnArrowPrev } from "../../ui/BtnArrow/BtnsArrow";


export const Pagination = ({ pageCount, callbackFun, initialPage }) => {
  const [pagesRange, setPagesRange] = useState(2);

  const widthChanhed = () => {
    if (window.innerWidth > 480) {
      setPagesRange(2)
    } else {
      setPagesRange(1);
    }
  }

  useEffect(() => {

    if (window.innerWidth > 480) {
      setPagesRange(2)
    } else {
      setPagesRange(1);
    }
    
    window.addEventListener('resize', widthChanhed);

    return () => {
      window.removeEventListener('resize', widthChanhed);
    }
  }, []);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<BtnArrowNext />}
        onPageChange={callbackFun}
        pageRangeDisplayed={pagesRange}
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
        marginPagesDisplayed={pagesRange}
      />
    </>
  );
};
