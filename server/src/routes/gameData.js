const express = require('express');
const { gameData } = require('../controllers/gameDataControllers');
const { addText } = require('../controllers/gameController');

const router = express.Router();

router
  .route('/game_data')
  .post(gameData);

router
  .route('/game_add')
  .post(addText);

module.exports = router;
