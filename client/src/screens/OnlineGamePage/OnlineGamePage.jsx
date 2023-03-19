/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Signin } from '../../components/Signin/Signin';
// import { socket } from '../../socket';
import ATYPES from '../../store/types';

import {
  Keyboard, Typing,
} from '../../components';

const socket = io('http://localhost:4000');

export function OnlineGamePage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.isAuth);
  const isComplete = useSelector((store) => store.isHidden);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomMate, setRoomMate] = useState(0);
  // const [roomCount, setRoomCount] = useState(0);
  const roomName = useRef('Waiting to join');

  const user = useSelector((state) => state.user.email);
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
    }
  }, [isComplete]);

  // получаем от сервера сообщение о том что мы проиграли
  // и пытаемся обнулить состояние онлайн игры на стороне клиента
  useEffect(() => {
    socket.on('end_game', (e) => {
      console.log(e);
      roomName.current = 'Waiting to join';
      setRoomMate(0);
      dispatch({ type: ATYPES.IS_WIN, payload: false });
      dispatch({ type: ATYPES.IS_HIDDEN, payload: true });
    });
  });

  useEffect(() => {
    // получаем от сервера сообщение о закрытии комнаты
    socket.on('room_closed', (e) => {
      // где-то тут нужно стартануть таймер для начала игры
      console.log(e);
    }, [isComplete]);

    socket.on('userCount', ({ connections, room }) => {
      // тут мы получаем количество юзеров и номер комнаты
      setRoomMate(connections);
      roomName.current = room;
    });
  }, [handleClick]);

  return isAuth ? (
    <div className="mainconteiner">
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
      <button type="button" onClick={handleClick}>Join to room</button>
      <Typing />
      <Keyboard />
    </div>
  ) : (
    <Signin />
  );
}
