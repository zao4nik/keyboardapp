/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config(); //  импорт библиотеки dotenv
const express = require('express'); // импорт библиотеки express
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session'); // библиотека для работы с сессиями
const FileStore = require('session-file-store')(session);
// Импортим проверочную функцию dbConnect
const dbConnect = require('../db/dbConnect');

// Импорт middlewares
const sessionControl = require('./middlewares/controlSession');

// Импорт роутов:
const authRouter = require('./routes/auth');
const gameData = require('./routes/gameData');

const app = express(); // создаём экземпляр сервера

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

app.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); }); // - проверяем работает ли сервер
