/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';

import { useTrail, animated } from 'react-spring';

import './Keyboard.css';

function Keyboard() {
  const keys0 = [
    {
      label: 'ESC', key: 'Escape', finger: 'pinky', row: 'row-0',
    },
    {
      label: '1', key: 'Digit1', finger: 'pinky', row: 'row-0',
    },
    {
      label: '2', key: 'Digit2', finger: 'ring', row: 'row-0',
    },
    {
      label: '3', key: 'Digit3', finger: 'middle', row: 'row-0',
    },
    {
      label: '4', key: 'Digit4', finger: 'pointer1st', row: 'row-0',
    },
    {
      label: '5', key: 'Digit5', finger: 'pointer2nd', row: 'row-0',
    },
    {
      label: '6', key: 'Digit6', finger: 'pointer2nd', row: 'row-0',
    },
    {
      label: '7', key: 'Digit7', finger: 'pointer1st', row: 'row-0',
    },
    {
      label: '8', key: 'Digit8', finger: 'middle', row: 'row-0',
    },
    {
      label: '9', key: 'Digit9', finger: 'ring', row: 'row-0',
    },
    {
      label: '0', key: 'Digit0', finger: 'pinky', row: 'row-0',
    },
    {
      label: '-', key: 'Minus', finger: 'pinky', row: 'row-0',
    },
    {
      label: '+', key: 'Equal', finger: 'pinky', row: 'row-0',
    },
    {
      label: 'Del', key: 'Backspace', finger: 'pinky', row: 'row-0',
    },
  ];
  const keys1 = [
    {
      label: '`', key: 'Backquote', finger: 'pinky', row: 'row-1',
    },
    {
      label: 'Q', key: 'KeyQ', finger: 'pinky', row: 'row-2',
    },
    {
      label: 'W', key: 'KeyW', finger: 'ring', row: 'row-2',
    },
    {
      label: 'E', key: 'KeyE', finger: 'middle', row: 'row-2',
    },
    {
      label: 'R', key: 'KeyR', finger: 'pointer1st', row: 'row-2',
    },
    {
      label: 'T', key: 'KeyT', finger: 'pointer2nd', row: 'row-2',
    },
    {
      label: 'Y', key: 'KeyY', finger: 'pointer2nd', row: 'row-2',
    },
    {
      label: 'U', key: 'KeyU', finger: 'pointer1st', row: 'row-2',
    },
    {
      label: 'I', key: 'KeyI', finger: 'middle', row: 'row-2',
    },
    {
      label: 'O', key: 'KeyO', finger: 'ring', row: 'row-2',
    },
    {
      label: 'P', key: 'KeyP', finger: 'pinky', row: 'row-2',
    },
    {
      label: '[', key: 'BracketLeft', finger: 'pinky', row: 'row-2',
    },
    {
      label: ']', key: 'BracketRight', finger: 'pinky', row: 'row-2',
    },
    {
      label: '\\', key: 'Backslash', finger: 'pinky', row: 'row-2',
    },
  ];
  const keys2 = [
    {
      label: 'CAPS', key: 'CapsLock', finger: 'pinky', row: 'row-2',
    },
    {
      label: 'A', key: 'KeyA', finger: 'pinky', row: 'row-2',
    },
    {
      label: 'S', key: 'KeyS', finger: 'ring', row: 'row-2',
    },
    {
      label: 'D', key: 'KeyD', finger: 'middle', row: 'row-2',
    },
    {
      label: 'F', key: 'KeyF', finger: 'pointer1st', row: 'row-2',
    },
    {
      label: 'G', key: 'KeyG', finger: 'pointer2nd', row: 'row-2',
    },
    {
      label: 'H', key: 'KeyH', finger: 'pointer2nd', row: 'row-2',
    },
    {
      label: 'J', key: 'KeyJ', finger: 'pointer1st', row: 'row-2',
    },
    {
      label: 'K', key: 'KeyK', finger: 'middle', row: 'row-2',
    },
    {
      label: 'L', key: 'KeyL', finger: 'ring', row: 'row-2',
    },
    {
      label: ';', key: 'Semicolon', finger: 'pinky', row: 'row-2',
    },
    {
      label: '"', key: 'Quote', finger: 'pinky', row: 'row-2',
    },
    {
      label: 'ENTER', key: 'Enter', finger: 'pinky', row: 'row-2', id: 'enter',
    },
  ];
  const keys3 = [
    {
      label: 'SHIFT', key: 'ShiftLeft', finger: 'pinky', row: 'row-3', id: 'left-shift',
    },
    {
      label: 'Z', key: 'KeyZ', finger: 'pinky', row: 'row-3',
    },
    {
      label: 'X', key: 'KeyX', finger: 'ring', row: 'row-3',
    },
    {
      label: 'C', key: 'KeyC', finger: 'middle', row: 'row-3',
    },
    {
      label: 'V', key: 'KeyV', finger: 'pointer1st', row: 'row-3',
    },
    {
      label: 'B', key: 'KeyB', finger: 'pointer2nd', row: 'row-3',
    },
    {
      label: 'N', key: 'KeyN', finger: 'pointer2nd', row: 'row-3',
    },
    {
      label: 'M', key: 'KeyM', finger: 'pointer1st', row: 'row-3',
    },
    {
      label: ',', key: 'Comma', finger: 'middle', row: 'row-3',
    },
    {
      label: '.', key: 'Period', finger: 'ring', row: 'row-3',
    },
    {
      label: '/', key: 'Slash', finger: 'pinky', row: 'row-3',
    },
    {
      label: 'SHIFT', key: 'ShiftRight', finger: 'pinky', row: 'row-3', id: 'right-shift',
    },
  ];
  const [lastKey, setLastKey] = useState(null);
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function handleKeyDown(event) {
    const key = event.code;
    console.log('Pressed key:', key);
    setLastKey(key);

    if (!isKeyPressed(key)) {
      setPressedKeys([...pressedKeys, key]);
    }
  }

  function handleKeyUp(event) {
    const key = event.code;
    setPressedKeys(pressedKeys.filter((pressedKey) => pressedKey !== key));
  }

  function isKeyPressed(key) {
    return pressedKeys.includes(key);
  }
  const config = { mass: 4, tension: 480, friction: 400 };

  const trail0 = useTrail(keys0.length, {
    config,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
    delay: 400,
  });
  const trail1 = useTrail(keys1.length, {
    config,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
    delay: 400,
  });
  const trail2 = useTrail(keys2.length, {
    config,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
    delay: 400,
  });
  const trail3 = useTrail(keys3.length, {
    config,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
    delay: 400,
  });

  const items = ['Space'];
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, transform: 'translateY(190px)' },
    to: { opacity: 1, transform: 'translateY(0,0,0)' },
    delay: 820,
  });
  //   const isKeyPressed = (key) => {
  //
  //     return false;
  //   };

  return (
    <div className="keyboard-container" tabIndex="0">
      <div className="keyboard">
        <ul className="row row-0">
          {trail0.map(({ opacity, transform }, index) => (
            <animated.li
              key={keys0[index].key}
              className={`${keys0[index].finger} ${keys0[index].row} ${isKeyPressed(keys0[index].key) ? 'pressed' : ''}`}
              style={{ opacity, transform }}
            >
              {keys0[index].label}
            </animated.li>
          ))}
        </ul>

        <ul className="row row-1">
          {trail1.map(({ opacity, transform }, index) => (
            <animated.li
              key={keys1[index].key}
              className={`${keys1[index].finger} ${keys1[index].row} ${isKeyPressed(keys1[index].key) ? 'pressed' : ''}`}
              style={{ opacity, transform }}
            >
              {keys1[index].label}
            </animated.li>
          ))}
        </ul>
        <ul className="row row-2">
          {trail2.map(({ opacity, transform }, index) => (
            <animated.li
              key={keys2[index].key}
              className={`${keys2[index].finger} ${keys2[index].row} ${isKeyPressed(keys2[index].key) ? 'pressed' : ''} ${keys2[index].id}`}
              style={{ opacity, transform }}
            >
              {keys2[index].label}
            </animated.li>
          ))}
        </ul>
        <ul className="row row-3">
          {trail3.map(({ opacity, transform }, index) => (
            <animated.li
              key={keys3[index].key}
              className={`${keys3[index].finger} ${keys3[index].row} ${isKeyPressed(keys3[index].key) ? 'pressed' : ''} ${keys3[index].id}`}
              style={{ opacity, transform }}
            >
              {keys3[index].label}
            </animated.li>
          ))}
        </ul>
        <ul className="row row-4">
          {trail.map((styles, index) => (
            <animated.li
              key={items[index]}
              className={`space ${isKeyPressed('Space') ? 'pressed' : ''}`}
              style={styles}
            >
              {items[index]}
            </animated.li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Keyboard;
