const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Text extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Text.init({
    data: DataTypes.STRING,
    titile: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Text',
  });
  return Text;
};
