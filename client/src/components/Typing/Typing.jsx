/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line jsx-a11y/no-static-element-interactions
import '../../App.css';
import React, { useEffect, useState } from 'react';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCode() {
  let code = '';
  const length = getRandomInt(5, 6); // длина кода от 5 до 30 символов

  for (let i = 0; i < length; i += 1) {
    const num = getRandomInt(1, 4);

    switch (num) {
      case 1:
        code += 'let ';
        break;
      case 2:
        code += 'const ';
        break;
      case 3:
        code += 'var ';
        break;
      case 4:
        code += 'if (';
        break;
      case 5:
        code += 'for (let i = 0; i < ';
        code += getRandomInt(1, 10);
        code += '; i++) {';
        break;
      case 6:
        code += 'function ';
        code += `myFunction${getRandomInt(1, 100)}`;
        code += '() {';
        break;
      case 7:
        code += 'console.log("';
        code += 'Hello World';
        code += '");';
        break;
      case 8:
        code += 'return ';
        code += getRandomInt(1, 100);
        code += ';';
        break;
      case 9:
        code += 'while (';
        code += 'true';
        code += ') {';
        break;
      case 10:
        code += 'switch (';
        code += getRandomInt(1, 10);
        code += ') {';
        break;
      case 11:
        code += 'case ';
        code += getRandomInt(1, 10);
        code += ':';
        break;
      case 12:
        code += '{';
        break;
      case 13:
        code += '}';
        break;
      default:
        code += ' ';
        break;
    }
  }
  return code;
}

export function Typing() {
  // в стейт нужно передавать данные с сервера/stor'a

  const [data, setData] = useState(
    generateRandomCode().replace(/\s+/g, ' ').trim().split(''),
  );
  const [isHidden, setIsHidden] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [stats, setStats] = useState({
    rightCount: 0,
    clickCount: 0,
    timeGame: 0,

  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 100000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // таймер
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = async (event) => {
    setStats((prevStats) => ({
      ...prevStats,
      clickCount: prevStats.clickCount + 1,
      timeGame: Number(seconds),
    }));
    const dataForChanging = data;
    if (event.key === data[0] && data.length > 0) {
      dataForChanging.shift();
      setData([...dataForChanging]);
      setStats((prevStats) => ({
        ...prevStats,
        rightCount: prevStats.rightCount + 1,
      }));
      if (data.length === 0) {
        setIsHidden(true);
        try {
          const response = await fetch('http://localhost:3001/game/game_data', {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stats),
          });

          const result = await response;
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  // console.log(stats);

  return (
    <div>
      <h1>Кликни на функцию и пиши </h1>
      {!isHidden ? (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <div tabIndex={0} onKeyDown={handleKeyDown}>
          <h2>{data}</h2>
        </div>
      ) : <h2>End!</h2>}
    </div>
  );
}
