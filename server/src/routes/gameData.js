const express = require('express');
const { gameData } = require('../controllers/gameDataCintrollers');

const router = express.Router();

router
  .route('/game_data')
  .post(gameData);

module.exports = router;
