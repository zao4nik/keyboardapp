/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import ATYPES from '../../store/types';
import { Popup } from '../Popup/Popup';
import './Typingforonline.css';

// Функция на рандома
function getElementById(arr, id) {
  return arr.find((element) => element.id === id);
}

export function Typingforonline({ showButton, timerDone }) {
  const dispatch = useDispatch();
  // const [data] = useState(() => 'hda'.split(''));
  const [data, setData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState([]);
  const [incorrectChars, setIncorrectChars] = useState([]);
  const isHidden = useSelector((store) => store.isHidden);
  const [seconds, setSeconds] = useState(0);
  const [stats, setStats] = useState({
    rightCount: 0,
    clickCount: 0,
    timeGame: 0,
  });

  const [gameStarted, setGameStarted] = useState(false);

  const handleKeyDown = useCallback(
    async (event) => {
      if (!gameStarted || isHidden) {
        return;
      }
      dispatch({
        type: ATYPES.COUNTER_DATA,
        payload: { data: data.length, rightCount: stats.rightCount },
      });
      const currentChar = data[currentIndex];
      if (event.type === 'keydown' && event.key === currentChar) {
        setCorrectChars((prevCorrectChars) => [...prevCorrectChars, currentIndex]);
        if (currentIndex === data.length - 1) {
          // первый диспатч нужен чтобы обновить каунтер для прогрессбара в конце сессии
          dispatch({ type: ATYPES.IS_HIDDEN, payload: true });
          setStats((prevStats) => ({
            ...prevStats,
            rightCount: prevStats.rightCount + 1,
            timeGame: seconds,
          }));

          try {
            await fetch('http://localhost:3001/game/game_data', {
              credentials: 'include',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(stats),
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setStats((prevStats) => ({
            ...prevStats,
            clickCount: prevStats.clickCount + 1,
            rightCount: prevStats.rightCount + 1,
          }));
          // тут мы обновляем данные для каунтера прогрессбара каждый правильный клик?
          dispatch({
            type: ATYPES.COUNTER_DATA,
            payload: { data: data.length, rightCount: stats.rightCount },
          });
        }
      } else if (
        currentIndex <= data.length - 1
      && event.key !== 'Shift'
      && event.key !== 'Enter'
      ) {
        setIncorrectChars((prevIncorrectChars) => [
          ...prevIncorrectChars,
          currentIndex,
        ]);
        setStats((prevStats) => ({
          ...prevStats,
          clickCount: prevStats.clickCount + 1,
        }));
      } else if (event.key === 'Enter') {
        setCurrentIndex((prevIndex) => {
          const nextIndex = data.indexOf('\n', prevIndex);
          if (nextIndex !== -1 && nextIndex === prevIndex) {
            return nextIndex + 1;
          }
          return prevIndex;
        });
      }
    },
    [currentIndex, data, gameStarted, isHidden, seconds],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameStarted && !isHidden) {
        // зачем тут дополнительно секунды?
        setSeconds((prevSeconds) => prevSeconds + 1);
        setStats((prevStats) => ({
          ...prevStats,
          timeGame: prevStats.timeGame + 1,
        }));
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, isHidden]);

  // eslint-disable-next-line no-unused-vars
  const [statsClose, setStatsClose] = useState(false);

  const restartGame = useCallback(() => {
    setStats({
      rightCount: 0,
      clickCount: 0,
      timeGame: 0,
    });
    setCurrentIndex(0);
    setCorrectChars([]);
    setIncorrectChars([]);
    dispatch({ type: ATYPES.IS_HIDDEN, payload: false });
    setGameStarted(false);
    setSeconds(0);
    dispatch({ type: ATYPES.IS_WIN, payload: true });
    dispatch({ type: ATYPES.IS_RELOAD, payload: true });
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (timerDone) {
      setGameStarted(true);
    }
  }, [timerDone]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/game/game_text');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        const datas = await response.json();
        console.log('🚀 datas==>', datas);

        // Получаем элемент по идентификатору
        const element = getElementById(datas.filteredDatas, 1);
        setData(element.data.split(''));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [gameStarted]);

  const renderGame = () => {
    if (!gameStarted) {
      return (
        <div>
          {showButton && (
          <button className="btn-start" type="button" onClick={startGame}>
            Start
          </button>
          )}
        </div>
      );
    }
    if (!isHidden) {
      return (
        <div tabIndex={0} className="superbox">
          <div className="conterbox">
            {data.map((char, index) => {
              if (char === '\n') {
                return <br key={index} />;
              }
              return (
                <span
                  key={index}
                  className={`${
                    index === currentIndex ? 'blinking-cursor' : ''
                  } ${correctChars.includes(index) ? 'correct' : ''} ${
                    incorrectChars.includes(index) ? 'incorrect' : ''
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      );
    }
    return createPortal(
      <Popup
        data={stats}
        onClose={() => restartGame()}
        incorrectCount={incorrectChars.length}
      />,
      document.body,
    );
  };

  return (
    <div>
      {renderGame()}
      {/* <button type="button" onClick={restartGame}>Restart</button> */}
    </div>
  );
}
