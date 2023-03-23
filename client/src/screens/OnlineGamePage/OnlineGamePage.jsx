/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Signin } from '../../components/Signin/Signin';
import './OnlineGamePage.css';
// import { socket } from '../../socket';
import ATYPES from '../../store/types';

import {
  Keyboard, Bar,
} from '../../components';
import { Typingforonline } from '../../components/Typingforonline/Typingforonline';

const socket = io('http://localhost:4000');

export function OnlineGamePage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.isAuth);
  const isComplete = useSelector((store) => store.isHidden);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomMate, setRoomMate] = useState(0);
  // const [roomCount, setRoomCount] = useState(0);
  const roomName = useRef('Waiting to join');
  const onReload = useSelector((store) => store.onReload);
  const [enemyProgressBar, setEnemyProgressBar] = useState({
    counter_state: 1,
    counter_end: 1,
  });
  console.log('enemyProgressBar', enemyProgressBar);
  const user = useSelector((state) => state.user.email);
  const progressBar = useSelector((state) => state.counterData);
  // const percentOfLose = Math.round(
  //   (enemyProgressBar.counter_state / enemyProgressBar.counter_end) * 100,
  // );

  useEffect(() => {
    // тут мы отправляем данные о нашем прогрессе
    socket.emit('progress_bar', { progressBar, roomName });
    // тут мы принемаем данные о прогрессе нашего соперника
    socket.on('progress_bar', (data) => {
      setEnemyProgressBar(data.progressBar);
    });
  }, [progressBar]);
  // отправляем на сокет сервер желание  попасть в комнату
  const handleClick = () => {
    socket.emit('sendUserToRoom', { user });
  };
  //  тут мы отправляем сообщение сокет серверу о том что мы выиграли эту игру
  useEffect(() => {
    if (isComplete === true) {
      socket.emit('end_game', { isComplete, roomName });
      roomName.current = 'Waiting to join';
      setRoomMate(0);
      setEnemyProgressBar({
        counter_state: 1,
        counter_end: 1,
      });
    }
  }, [isComplete]);

  // получаем от сервера сообщение о том что мы проиграли
  // и пытаемся обнулить состояние онлайн игры на стороне клиента
  useEffect(() => {
    socket.on('end_game', (e) => {
      console.log(e);
      roomName.current = 'Waiting to join';
      setRoomMate(0);
      setEnemyProgressBar({
        counter_state: 1,
        counter_end: 1,
      });
      dispatch({ type: ATYPES.IS_WIN, payload: false });
      dispatch({ type: ATYPES.IS_HIDDEN, payload: true });
    });
  });

  const [eventOccurred, setEventOccurred] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  // eslint-disable-next-line no-unused-vars
  // const [onlineGameStarted, setOnlineGameStarted] = useState(false);

  useEffect(() => {
    // получаем от сервера сообщение о закрытии комнаты
    // * remove join button and add timer here
    socket.on('room_closed', (e) => {
      // где-то тут нужно стартануть таймер для начала игры
      console.log('=-=->', e);
      if (e) {
        setEventOccurred(true);
        setShowModal(true);
      }
    }, [isComplete]);

    socket.on('userCount', ({ connections, room }) => {
      // тут мы получаем количество юзеров и номер комнаты
      setRoomMate(connections);
      roomName.current = room;
    });
  }, [handleClick]);

  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    if (!showModal && countdown === 0) {
      setTimerDone(true);
      setCountdown(3);
    }
    let timer;
    if (showModal && countdown > 0) {
      setTimerDone(false);
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (showModal && countdown === 0) {
      setShowModal(false);
    }
    return () => clearTimeout(timer);
  }, [showModal, countdown]);

  useEffect(() => {
    if (onReload) {
      setEventOccurred(false);
      dispatch({ type: ATYPES.IS_RELOAD, payload: false });
      // window.location.reload(true);
    }
  }, [onReload]);

  return isAuth ? (
    <div className="overlayBase">
      {enemyProgressBar.counter_end > 2 ? (
        <Bar
          percentOfLose={enemyProgressBar}
        />
      ) : ' '}
      <h2>
        {' '}
        Room:
        {roomName.current}

      </h2>
      <h2>
        {' '}
        RoomMate:
        {' '}
        {roomMate}
      </h2>
      <div>
        {!eventOccurred && <button type="button" onClick={handleClick}>Join the room</button>}
      </div>
      {showModal && (
      <div className="Countdown overlay">
        <p>
          {countdown}
        </p>
      </div>
      )}
      <Typingforonline showButton={false} timerDone={timerDone} />
      <Keyboard />
    </div>
  ) : (
    <Signin />
  );
}
