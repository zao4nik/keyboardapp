<<<<<<< HEAD
import React from 'react';
import styles from './MyStatistics.module.css';
=======
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import './MyStatistics.css';
>>>>>>> 69f28b73af5fb976d4d7b613414a3fca88b37dde

function Stat({ data, loading }) {
  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
<<<<<<< HEAD
      {data.map((item) => (
        <div
          className={styles.container}
          key={item.id}
        >
          <p>
            {' '}
            Data: {item.data} | Chars/Sec: {item['chars/sec']} | Words/Min:{' '}
            {item['words/min']} | Accuracy: {item.accuracy} | Mistakes:{' '}
            {item.mistakes}
          </p>
        </div>
      ))}
=======
      {data &&
        data.map((item) => (
          <div
            className="container"
            key={item.id}
          >
            <p className="myItem">
              {' '}
              Data: {item.data} | Time Game: {item.timeGame} | Words/Min:{' '}
              {item['words/min']} | Accuracy: {item.accuracy} | Mistakes:{' '}
              {item.mistakes}
            </p>
          </div>
        ))}
>>>>>>> 69f28b73af5fb976d4d7b613414a3fca88b37dde
    </div>
  );
}

export default Stat;
