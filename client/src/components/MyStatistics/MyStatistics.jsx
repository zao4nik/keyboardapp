/* eslint-disable array-bracket-spacing */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stat from './Stat';
import { data } from './data';
import { Signin } from '../Signin/Signin';
import styles from './MyStatistics.module.css';

export function MyStatistics() {
  const isAuth = useSelector((store) => store.isAuth);
  const [stat, setStat] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statPerPage] = useState(3);

  // * надо переделать для запроса с базы
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

  const pageNumbers = [];
  const totalStat = stat.length;

  for (let i = 1; i <= Math.ceil(totalStat / statPerPage); i++) {
    pageNumbers.push(i);
  }

  return isAuth ? (
    <div>
      <h1 className={styles.myStat}>My Statistics</h1>
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
  ) : (
    <Signin />
  );
}
