import React from 'react';

function Pagination({ statPerPage, totalStat, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStat / statPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            className="page-item"
            key={number}
          >
            <button
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
