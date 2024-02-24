// Pagination.js

import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
