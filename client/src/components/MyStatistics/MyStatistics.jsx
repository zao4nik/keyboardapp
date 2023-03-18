/* eslint-disable array-bracket-spacing */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Stat from './Stat';
// import { data } from './data';
import { Signin } from '../Signin/Signin';
import styles from './MyStatistics.module.css';
import Pagination from './Pagination';

export function MyStatistics() {
  const isAuth = useSelector((store) => store.isAuth);
  const [stat, setStat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statPerPage] = useState(3);

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

  const lastStatIndex = currentPage * statPerPage;
  const firstStatIndex = lastStatIndex - statPerPage;
  const currentStat = stat.slice(firstStatIndex, lastStatIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return isAuth ? (
    <div>
      <h1 className={styles.myStat}>My Statistics</h1>
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
  );
}
