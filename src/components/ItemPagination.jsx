import React from "react";
import Pagination from "@mui/material/Pagination";

const ItemPagination = ({ page, setPage, numOfPages }) => {
  const handlePageChange = (page) => {
    setPage(parseInt(page));
    window.scroll(0, 0);
  };

  return (
    <div className="mt-4 flex justify-center">
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        page={page}
        count={numOfPages}
        shape="rounded"
      />
    </div>
  );
};

export default ItemPagination;
