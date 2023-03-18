/* eslint-disable react/prop-types */
import React from 'react';

import styles from './MyStatistics.module.css';

function Pagination({ statPerPage, totalStat, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStat / statPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            style={{ all: 'unset' }}
            className="pageNumber"
            key={number}
          >
            <button
              type="button"
              className={styles.pageLink}
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
