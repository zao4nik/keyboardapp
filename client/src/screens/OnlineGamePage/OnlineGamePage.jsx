import { Cookie } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { socket } from '../../socket';

import io from 'socket.io-client';

import {
  Keyboard, Typing,
} from '../../components';

const socket = io('http://localhost:4000');

export function OnlineGamePage() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomMate, setRoomMate] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const roomName = useRef('Waiting to join');

  const user = useSelector((state) => state.user.email);
  // отправляем на сокет сервер желание  попасть в комнату
  const handleClick = () => {
    socket.emit('sendUserToRoom', { user });
  };

  useEffect(() => {
    // получаем от сервера сообщение о закрытии комнаты
    socket.on('room_closed', (e) => {
      // где-то тут нужно стартануть таймер для начала игры
      console.log(e);
    });

    socket.on('userCount', ({ connections, room }) => {
      // тут мы получаем количество юзеров и номер комнаты
      setRoomMate(connections);
      roomName.current = room;
    });
  }, [handleClick]);

  return (
    <Box>
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
    </Box>
  );
}
