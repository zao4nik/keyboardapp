// Импорт bcrypt для хеширования паролей:
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
// Импорт модели User из БД:
const { User } = require('../../db/models');

// Создаём, хешируем и отправляем:
const createUserAndSession = async (req, res) => {
  const { login, password, email } = req.body;
  console.log('Регистрация: req.body: ', req.body);
  try {
    // Хешируем пароль:
    const hash = 10;
    const hashedPassword = await bcrypt.hash(password, hash);
    // Записываем данные в БД:
    const user = await User.create({
      login,
      email,
      password: hashedPassword,
    });
    console.log(
      `Регистрация ======> Пользователь под login: ${user.login} - успешно зарегистрирован на сайте!`,
    );
    req.session.user = { userId: user.id, email: user.email };
    req.session.save();
    res.json({ userId: user.id, login: user.login, email: user.email });
    // res.status(200).end();
  } catch (err) {
    console.log(err);
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') {
      errMsg = err.errors[0].message;
    }
    console.error('Err message:', err.message);
    console.log('ОШИБКА ПРИ РЕГИСТРАЦИИ: =====> Текст ошибки:', err.message);
    console.error('Err code', err.code);
    res.status(401).json({ errMsg });
  }
};

// авторизация пользователя + создание сессии:
const checkUserAndCreateSession = async (req, res) => {
  const { email, password } = req.body;
  // console.log('Авторизация: ===>', req.body);
  try {
    if (email || password) {
      // Пытаемся найти пользователя в БД
      const user = await User.findOne({ where: { email }, raw: true });
      if (!user) { return res.status(401).json({ errMsg: 'Неправильное имя/пароль' }); }

      // Сравниваем хэш в БД с хэшем введённого пароля
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) { return res.status(401).json({ errMsg: 'Неправильное пароль/имя' }); }

      console.log(
        `======> Авторизация: Пользователь под login: ${user.email} - успешно авторизовался на сайте!`,
      );

      // записываем в req.session.user при авторизации данные (id & login) (создаем сессию)
      req.session.user = { userId: user.id, email: user.email };
      console.log(
        `------>Сессия: Сессия для пользователя: ${user.email} под id в БД: ${user.id} успешно создана!`,
      );
      req.session.save();
      res
        .status(200)
        .json({ userId: user.id, login: user.login, email: user.email });
    }
  } catch (err) {
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') {
      errMsg = err.errors[0].message;
    }
    console.error('Err message:', err.message);
    console.log('ОШИБКА ПРИ АВТОРИЗАЦИИ: =====> Текст ошибки:', err.message);
    console.error('Err code', err.code);
    res.status(401).json({ errMsg });
  }
};

const userInfo = async (req, res) => {
  const myUser = req.session.user;
  try {
    res.json(myUser);
  } catch (error) {
    console.log(error);
  }
};

// Удаление сессии
const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    res.clearCookie('ArcticFoxesCookie');
    return res.json({ status: 200 });
  });
};

module.exports = {
  createUserAndSession,
  checkUserAndCreateSession,
  signOut,
  userInfo,
};
