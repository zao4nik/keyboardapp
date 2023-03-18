/* eslint-disable react/prop-types */
import React from 'react';
import './Popup.styles.css';

export function Popup({ onClose }) {
  return (
    <div className="popup">
      <div className="container">
        <div className="data">Сюда нужно выводить данные после игры и по кнопке завершать игровую сессию</div>
      </div>
      <button type="button" onClick={onClose}>Close</button>

    </div>
  );
}
