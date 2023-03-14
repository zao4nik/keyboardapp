// Импорт bcrypt для хеширования паролей:
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
    req.session.save();
    res.json({ user: user.id, login: user.login, email: user.email });
    // res.status(200).end();
  } catch (err) {
    console.log(err);
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') { errMsg = err.errors[0].message; }
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
    // Пытаемся найти пользователя в БД
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) return res.status(401).json({ errMsg: 'Неправильное имя/пароль' });

    // Сравниваем хэш в БД с хэшем введённого пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ errMsg: 'Неправильное пароль/имя' });

    console.log(
      `======> Авторизация: Пользователь под login: ${user.email} - успешно авторизовался на сайте!`,
    );

    // записываем в req.session.user при авторизации данные (id & login) (создаем сессию)
    req.session.user = { id: user.id, email: user.email };
    console.log(
      `------>Сессия: Сессия для пользователя: ${user.email} под id в БД: ${user.id} успешно создана!`,
    );
    req.session.save();
    res.status(200).json(user);
  } catch (err) {
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') { errMsg = err.errors[0].message; }
    console.error('Err message:', err.message);
    console.log('ОШИБКА ПРИ АВТОРИЗАЦИИ: =====> Текст ошибки:', err.message);
    console.error('Err code', err.code);
    res.status(401).json({ errMsg });
  }
};

// Удаление сессии
const destroySession = (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err);
    res.clearCookie('ArcticFoxesCookie');
    res.sendStatus(200);
  });
};

module.exports = {
  createUserAndSession,
  checkUserAndCreateSession,
  destroySession,
};
