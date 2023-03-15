/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { /* useEffect, */ useState } from 'react';
import Stat from './Stat';
import { data } from './data';
import Pagination from './Pagination';

export function MyStatistics() {
  const [stat, setStat] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statPerPage] = useState(3);

  // * надо переделать для запроса с базы
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('url', {
  //       method: 'GET',
  //       credentials: 'include', // куки
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const MyStat = await response.json();
  //     console.log('statistic ', MyStat);
  //     setStat(MyStat);
  //   })();
  //   setLoading(false);
  // }, []);

  const lastStatIndex = currentPage * statPerPage;
  const firstStatIndex = lastStatIndex - statPerPage;
  const currentStat = stat.slice(firstStatIndex, lastStatIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>MyStatistics</h1>
      <Stat
        data={currentStat}
        loading={loading}
      />
      <Pagination
        statPerPage={statPerPage}
        totalStat={stat.length}
        paginate={paginate}
      />
    </div>
  );
}
