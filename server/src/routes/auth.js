const express = require('express');

//   renderSignInForm, renderSignUpForm,
const {
  createUserAndSession,
  checkUserAndCreateSession,
  signOut,
  userInfo,
} = require('../controllers/authControllers');

const router = express.Router();

router
  .route('/signup')
  .post(createUserAndSession); // Регистрация пользователя + промежуточный обработчик

router
  .route('/signin')
  .post(checkUserAndCreateSession); // Аутентификация пользователя

router.get('/signout', signOut);

router.get('/userinfo', userInfo);

module.exports = router;
