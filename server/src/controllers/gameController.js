const { userText } = require('../../db/models');

// Добавляем текст пользователя:
const addText = async (req, res) => {
  const { user } = req.session;
  // console.log('🚀  3) req.session==>', req.session)
  // console.log('🚀  4)userId==>', user.userId);
  const { text, title, userID } = req.body;
  // console.log('🚀  5) userId--->', userID)
  // console.log('🚀  6) req.body==>', req.body);
  
  if (user.userId === userID) {
    try {
      const add = await userText.create({
        text,
        title,
        userId: userID,
      });
      console.log('🚀  Пользователь успешно добавил запись==>', add);
      res.json({ status: 200, add });
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = { addText };
