/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import styles from './MyStatistics.module.css';

function Pagination({ statPerPage, totalStat, paginate }) {
  const pageNumbers = [];
  const [isActive, setIsActive] = useState(null);

  for (let i = 1; i <= Math.ceil(totalStat / statPerPage); i += 1) {
    pageNumbers.push(i);
  }

  // const handleClick = (e) => {
  //   setIsActive((current) => !current);
  // };

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
              // style={{
              //   color: isActive ? 'red' : '',
              // }}
              className={isActive === number ? styles.pageLinkFocus : ''}
              onClick={() => {
                paginate(number);
                setIsActive(number);
              }}
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
