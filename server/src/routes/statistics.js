const express = require('express');

const router = express.Router();
const { Game } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const { user } = req.session;
    const allStatistics = await Game.findAll({
      where: { userId: user.id },
      order: [['id', 'DESC']],
      raw: true,
    });
    console.log('🚀 ~ allStatistics', allStatistics)

    res.json({ allStatistics });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
