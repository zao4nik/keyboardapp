/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './MyStatistics.module.css';

function Stat({ data, loading }) {
  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      {data &&
        data.map((item) => (
          <div
            className={styles.container}
            key={item.id}
          >
            <p className={styles.myItem}>
              {' '}
              Data: {item.data} | Time Game: {item.timeGame} | Words/Min:{' '}
              {item['words/min']} | Accuracy: {item.accuracy} | Mistakes:{' '}
              {item.mistakes}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Stat;
