/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import ATYPES from '../../store/types';
import { Popup } from '../Popup/Popup';
import './Typing.css';

export function Typing() {
  const dispatch = useDispatch();
  const [data] = useState(() => 'hello W.orld alert( fruits.length );'.split(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState([]);
  const [incorrectChars, setIncorrectChars] = useState([]);
  const isHidden = useSelector((store) => store.isHidden);
  const [seconds, setSeconds] = useState(0);
  const [stats, setStats] = useState({
    rightCount: -1,
    clickCount: 0,
    timeGame: 0,
  });
  const [gameStarted, setGameStarted] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (!gameStarted || isHidden) {
      return;
    }
    const currentChar = data[currentIndex];
    if (event.type === 'keydown' && event.key === currentChar) {
      setCorrectChars((prevCorrectChars) => [...prevCorrectChars, currentIndex]);
      if (currentIndex === data.length - 1) {
        dispatch({ type: ATYPES.IS_HIDDEN, payload: true });
        setStats((prevStats) => ({
          ...prevStats,
          rightCount: prevStats.rightCount + 1,
          timeGame: seconds,
        }));
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setStats((prevStats) => ({
          ...prevStats,
          clickCount: prevStats.clickCount + 1,
          rightCount: prevStats.rightCount + 1,
        }));
      }
    } else if (currentIndex <= data.length - 1 && event.key !== 'Shift') {
      setIncorrectChars((prevIncorrectChars) => [...prevIncorrectChars, currentIndex]);
      setStats((prevStats) => ({
        ...prevStats,
        clickCount: prevStats.clickCount + 1,
      }));
    }
  }, [currentIndex, data, gameStarted, isHidden, seconds]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameStarted && !isHidden) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, isHidden]);
  const restartGame = useCallback(() => {
    setStats({
      rightCount: -1,
      clickCount: 0,
      timeGame: 0,
    });
    setCurrentIndex(0);
    setCorrectChars([]);
    setIncorrectChars([]);
    dispatch({ type: ATYPES.IS_HIDDEN, payload: false });
    setGameStarted(false);
    setSeconds(0);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const renderGame = () => {
    if (!gameStarted) {
      return (
        <div>
          <button className="btn-start" type="button" onClick={startGame}>Start</button>
        </div>
      );
    }
    if (!isHidden) {
      return (
        <div tabIndex={0} className="superbox">
          <div className="conterbox">
            {data.map((char, index) => (
              <span
                key={index}
                className={`${index === currentIndex ? 'blinking-cursor' : ''} ${
                  correctChars.includes(index) ? 'correct' : ''
                } ${incorrectChars.includes(index) ? 'incorrect' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      );
    }
    return (
      createPortal(
        <Popup data={stats} onClose={() => restartGame()} incorrectCount={incorrectChars.length} />,
        document.body,
      )
    );
  };

  return (
    <div>
      {renderGame()}
      {/* <button type="button" onClick={restartGame}>Restart</button> */}
    </div>
  );
}
