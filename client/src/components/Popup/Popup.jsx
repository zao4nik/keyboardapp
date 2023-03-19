/* eslint-disable react/prop-types */
import React from 'react';
import './Popup.styles.css';

export function Popup({ data, onClose, incorrectCount }) {
  return (
    <div className="popup">
      <div className="popup-container">
        <div className="end"> End! </div>
        <div className="data">
          Right:
          {data.rightCount}

          Wrong:
          {incorrectCount}

          Time:
          {data.timeGame}
          {' '}
          seconds

          Clicks:
          {data.clickCount}

        </div>
      </div>
      <button type="button" onClick={onClose}>Close</button>

    </div>
  );
}
