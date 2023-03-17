// Middleware для контроля сессий.
// Для того, чтобы при переходе на любую страницу отображался req.session:

const sessionControl = (req, res, next) => {
  console.log('1) Контроль сессии: ===>>>', req.session);
  console.log('2) Контроль сессии: --------------->', req.session.user);
  next();
};

module.exports = sessionControl;
