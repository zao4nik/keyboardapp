const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Game.init({
    userId: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    mistakeCount: DataTypes.INTEGER,
    rightCount: DataTypes.INTEGER,
    clickCount: DataTypes.INTEGER,
    timeGame: DataTypes.STRING,
    accuracy: DataTypes.INTEGER,
    wordsPmin: DataTypes.INTEGER,
    charPsec: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
