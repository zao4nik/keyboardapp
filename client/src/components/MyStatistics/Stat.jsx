/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import './MyStatistics.css';

function Stat({ data, loading }) {
  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      {data &&
        data.map((item) => (
          <div
            className="container"
            key={item.id}
          >
            <p className="myItem">
              {' '}
              Data: {item.data} | Time Game: {item.timeGame} | Char/Min:{' '}
              {item['words/min']} | Accuracy: {item.accuracy} % | Mistakes:{' '}
              {item.mistakes}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Stat;
