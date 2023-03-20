const { Game } = require('../../db/models');

const gameData = async (req, res) => {
  console.log('=>>>>>>>>>>>>>>>>>>>>', req.body);
  const { rightCount, clickCount, timeGame } = req.body;
  const mistakeCount = clickCount - rightCount;
  const accuracy = Math.round((mistakeCount / clickCount) * 100);
  const wordsPmin = Math.round((rightCount / timeGame) * 60);

  if (req.session.user !== undefined) {
    console.log('================', req.session.user);
    const { userId } = req.session.user;
    try {
      const game = await Game.create({
        userId,
        points: 0,
        mistakeCount,
        rightCount,
        clickCount,
        timeGame,
        accuracy,
        wordsPmin,
        charPsec: wordsPmin,
      });
      res.send('data');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  gameData,
};
