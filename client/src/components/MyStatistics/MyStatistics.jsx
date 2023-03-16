/* eslint-disable array-bracket-spacing */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { /* useEffect, */ useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stat from './Stat';
import { data } from './data';
// import Pagination from './Pagination';

export function MyStatistics() {
  const [stat /* , setStat */] = useState(data);
  const [loading /* , setLoading */] = useState(false);
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

  const pageNumbers = [];
  const totalStat = stat.length;

  for (let i = 1; i <= Math.ceil(totalStat / statPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>MyStatistics</h1>
      <Pagination
        sx={{ button: { color: '#fbeee0' } }}
        color="primary"
        variant="outlined"
        shape="rounded"
        count={pageNumbers.length} // кол-во страничек пагинации (длина массива)
        page={currentPage} // текущая активная страница
        onChange={(_, num) => setCurrentPage(num)} // функция для клика по номеру страницу
      />
      <Stat
        data={currentStat}
        loading={loading}
      />
    </div>
  );
}
