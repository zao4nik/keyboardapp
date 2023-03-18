/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';

export function Typing() {
  const [data] = useState(() => 'hello W.orld alert( fruits.length );'.split(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState([]);
  const [incorrectChars, setIncorrectChars] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [stats, setStats] = useState({
    rightCount: 0,
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
        setIsHidden(true);
        setStats((prevStats) => ({ ...prevStats, timeGame: seconds }));
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setStats((prevStats) => ({ ...prevStats, clickCount: prevStats.clickCount + 1 }));
      }
    } else if (currentIndex <= data.length - 1 && event.key !== 'Shift') {
      setIncorrectChars((prevIncorrectChars) => [...prevIncorrectChars, currentIndex]);
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
      rightCount: 0,
      clickCount: 0,
      timeGame: 0,
    });
    setCurrentIndex(0);
    setCorrectChars([]);
    setIncorrectChars([]);
    setIsHidden(false);
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
          <button type="button" onClick={startGame}>Start</button>
        </div>
      );
    }
    if (!isHidden) {
      return (
        <div tabIndex={0}>
          <div>
            {data.map((char, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: correctChars.includes(index)
                    ? 'green'
                    : incorrectChars.includes(index)
                      ? 'red'
                      : 'transparent',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>End!</h2>
        <p>
          Right:
          {correctChars.length}
        </p>
        <p>
          Wrong:
          {incorrectChars.length}
        </p>
        <p>
          Time:
          {stats.timeGame}
          {' '}
          seconds
        </p>
        <p>
          Clicks:
          {stats.clickCount}
        </p>
      </div>
    );
  };

  return (
    <div>
      {renderGame()}
      <button type="button" onClick={restartGame}>Restart</button>
    </div>
  );
}
