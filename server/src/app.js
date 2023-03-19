/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config(); //  импорт библиотеки dotenv
const express = require('express'); // импорт библиотеки express
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session'); // библиотека для работы с сессиями
const FileStore = require('session-file-store')(session);

const app = express(); // создаём экземпляр сервера
// Тут мы создаём сервер для сокетов и сокет сервер
// const http = require('http');

// const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Импортим проверочную функцию dbConnect
const dbConnect = require('../db/dbConnect');

// Импорт middlewares
const sessionControl = require('./middlewares/controlSession');

// Импорт роутов:
const authRouter = require('./routes/auth');
const gameData = require('./routes/gameData');
const gameStatistics = require('./routes/statistics');

const { PORT, COOKIE_SECRET } = process.env; // задаем порт в переменную

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
  origin: 'http://localhost:3000',
  credentials: true,
  // allowedHeaders: ['content-type'],
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// middleware для контроля сессий
app.use(sessionControl);

app.use('/auth', authRouter);
app.use('/game', gameData);

io.listen(4000);

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
  });

  // обработчик, который вызывается, когда пользователь отключается от сервера
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('disconnect', (e) => {
    const { rooms } = io.sockets.adapter;
    console.log('rooms', rooms);
    console.log(e);
  });
});

// io.on('disconnect',(socket) => {
//   console.log('disconnect')
// })

app.use('/stats', gameStatistics);

app.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); }); // - проверяем работает ли сервер
