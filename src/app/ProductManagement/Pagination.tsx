import React, { useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1);



  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${props.currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => props.onPageChange(props.currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${props.currentPage === page ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => props.onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${props.currentPage === props.totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => props.onPageChange(props.currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
