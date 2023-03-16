const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userText extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  userText.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userText',
  });
  return userText;
};
