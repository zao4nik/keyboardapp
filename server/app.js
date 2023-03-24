/* eslint-disable import/no-extraneous-dependencies */
const express = require('express'); // импорт библиотеки express
const cors = require('cors');
const session = require('express-session'); // библиотека для работы с сессиями
const FileStore = require('session-file-store')(session);
require('dotenv').config(); //  импорт библиотеки dotenv

const app = express(); // создаём экземпляр сервера
// Тут мы создаём сервер для сокетов и сокет сервер
// const http = require('http');

// const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: 'https://keyboarder.onrender.com/',
  },
});

// Импортим проверочную функцию dbConnect
const dbConnect = require('./db/dbConnect');

// Импорт middlewares
const sessionControl = require('./src/middlewares/controlSession');

// Импорт роутов:
const authRouter = require('./src/routes/auth');
const gameData = require('./src/routes/gameData');
const gameStatistics = require('./src/routes/statistics');
const addText = require('./src/routes/gameData');

const { PORT, COOKIE_SECRET, IO_PORT } = process.env; // задаем порт в переменную

dbConnect();

// Конфиг для куки в виде файла сессий:
const sessionConfig = {
  name: 'ArcticFoxesCookie',
  store: new FileStore({}),
  secret: COOKIE_SECRET ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(cors({
  origin: 'https://keyboarder.onrender.com/',
  credentials: true,
  // allowedHeaders: ['content-type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// middleware для контроля сессий
app.use(sessionControl);

app.use('/auth', authRouter);
app.use('/game', gameData);
app.use('/game_add', addText);

io.listen(IO_PORT);

io.on('connection', (socket) => {
  // тут мы ловим сообщение от юзера что он хочет в комнату и присылает свои данные

  socket.on('sendUserToRoom', ({ user }) => {
    // номер комнаты
    let room = 1;
    // толучаем список всех соединений в первой комнате, которую будем обновлять в будущем
    const connections = io.sockets.adapter.rooms.get(room);

    // socket.emit('newUserJoined', user);
    // тут проверки на заполненность комнаты идёт и инкремент номера комнаты
    if (connections && connections.size >= 1) {
      while (io.sockets.adapter.rooms.get(room) && io.sockets.adapter.rooms.get(room).size >= 2) {
        room += 1;
      }
    }
    // добавляем пользователя в комнату соответствущую номеру
    socket.join(room);
    // отправляем сообщения об активации пользователя в комнате ( на клиенте пока не используем)
    socket.emit('newUserJoined', user);
    // отправляем сообщения в конкретной комнате о её  номере и заполненности
    //* отслеживаем для таймера
    io.in(room).emit('userCount', { connections: io.sockets.adapter.rooms.get(room).size, room });

    // отправляем сообщение о закрытии комнаты участникам, если комната заполнена
    if (io.sockets.adapter.rooms.get(room) && io.sockets.adapter.rooms.get(room).size >= 2) {
      io.in(room).emit('room_closed', `Комната закрыта для новых подключений ${room}`);
    }

    // получаем данные для прогресс бара и отправляем соседу по комнате
    socket.on('progress_bar', (data) => {
      socket.broadcast.to(data.roomName.current).emit('progress_bar', data);
    });

    socket.on('end_game', (data) => {
      socket.broadcast.to(data.roomName.current).emit('end_game', 'Game End');
      const closedRoom = io.of('/').adapter.rooms.get(data.roomName.current);
      if (closedRoom) {
        Array.from(closedRoom).forEach((socketId) => {
          // Выталкиваем сокет из комнаты
          io.sockets.sockets.get(socketId).leave(data.roomName.current);
        });
      }
    });
  });

  // обработчик, который вызывается, когда пользователь отключается от сервера
  socket.on('disconnect', () => {
  });

  socket.on('disconnect', (e) => {
    const { rooms } = io.sockets.adapter;
    console.log('rooms', rooms);
    console.log(e);
  });
});

app.use('/stats', gameStatistics);

app.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); }); // - проверяем работает ли сервер
