/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import './Popup.css';

export function Popup({ data, onClose, incorrectCount }) {
  const isWin = useSelector((state) => state.isWin);
  return (
    <div className="popup">
      <div className="popup-container">
        <div className="end">
          {' '}
          {isWin ? 'YOU WIN!' : 'YOU LOSE!'}
          {' '}
        </div>
        <div className="data">
          Right:
          {data.rightCount}
          {' '}
          Wrong:
          {incorrectCount}
          {' '}
          Time:
          {data.timeGame}
          sec

          Clicks:
          {data.clickCount + 1}

        </div>
      </div>
      <button type="button" onClick={onClose}>Close</button>

    </div>
  );
}
