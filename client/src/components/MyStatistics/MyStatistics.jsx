<<<<<<< HEAD
=======
/* eslint-disable array-bracket-spacing */
>>>>>>> 69f28b73af5fb976d4d7b613414a3fca88b37dde
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
<<<<<<< HEAD
import React, { /* useEffect, */ useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stat from './Stat';
import { data } from './data';
// import Pagination from './Pagination';

export function MyStatistics() {
  const [stat, setStat] = useState(data);
=======
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Stat from './Stat';
// import { data } from './data';
import { Signin } from '../Signin/Signin';
import './MyStatistics.css';
import Pagination from './Pagination';

export function MyStatistics() {
  const isAuth = useSelector((store) => store.isAuth);
  const [stat, setStat] = useState([]);
>>>>>>> 69f28b73af5fb976d4d7b613414a3fca88b37dde
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statPerPage] = useState(3);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/stats', {
        method: 'GET',
        credentials: 'include', // куки
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const allStatistics = await response.json();

      // console.log('statistic ', allStatistics);

      const arrayForMap = allStatistics.allStatistics;

      const myStata = arrayForMap.map((item) => ({
        id: item.id,
        data: `${item.createdAt.slice(11, 16)}♦${item.createdAt.slice(0, 10)}`,
        timeGame: item.timeGame,
        'words/min': item.wordsPmin,
        accuracy: item.accuracy,
        mistakes: item.mistakeCount,
      }));
      // console.log('🚀 ~ myStata:', myStata[0].data);

      setStat(myStata);
    })();
    setLoading(false);
  }, []);
>>>>>>> 69f28b73af5fb976d4d7b613414a3fca88b37dde

  const lastStatIndex = currentPage * statPerPage;
  const firstStatIndex = lastStatIndex - statPerPage;
  const currentStat = stat.slice(firstStatIndex, lastStatIndex);

<<<<<<< HEAD
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const totalStat = stat.length;

  for (let i = 1; i <= Math.ceil(totalStat / statPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>MyStatistics</h1>
      <Pagination
        color="primary"
        count={pageNumbers.length} // кол-во страничек пагинации (длина массива)
        page={currentPage} // текущая активная страница
        onChange={(_, num) => setCurrentPage(num)} // функция для клика по номеру страницу
      />
      <Stat
        data={currentStat}
        loading={loading}
      />
    </div>
=======
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return isAuth ? (
    <div>
      <h1 className="myStat">My Statistics</h1>
      <Pagination
        statPerPage={statPerPage}
        totalStat={stat.length}
        paginate={paginate}
      />
      {stat.length > 0 ? (
        <Stat
          data={currentStat}
          loading={loading}
        />
      ) : (
        <h1>No games played</h1>
      )}
    </div>
  ) : (
    <Signin />
>>>>>>> 69f28b73af5fb976d4d7b613414a3fca88b37dde
  );
}
