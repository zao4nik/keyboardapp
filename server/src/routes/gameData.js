const express = require('express');
const { gameData } = require('../controllers/gameDataControllers');

const router = express.Router();

router
  .route('/game_data')
  .post(gameData);

module.exports = router;
