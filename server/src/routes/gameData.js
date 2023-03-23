const express = require('express');
const { gameData } = require('../controllers/gameDataControllers');
const { addText, getText } = require('../controllers/gameController');

const router = express.Router();

router
  .route('/game_data')
  .post(gameData);

router
  .route('/game_add')
  .post(addText);

router
  .route('/game_text')
  .get(getText);

module.exports = router;
