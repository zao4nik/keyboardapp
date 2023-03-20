const { userText } = require('../../db/models');

const { Text } = require('../../db/models');

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

// Достаём из БД данные из таблицы Text:
const getText = async (req, res) => {
  const { user } = req.session;

  try {
    const datas = await Text.findAll({ raw: true });
    console.log('🚀  datas==>', datas);

    const filteredDatas = datas.map((item) => ({
      id: item.id,
      titile: item.titile,
      data: item.data,
    }));
    res.json({ status: 200, filteredDatas });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addText, getText };
