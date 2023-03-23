/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      points: {
        type: Sequelize.INTEGER,
      },
      mistakeCount: {
        type: Sequelize.INTEGER,
      },
      rightCount: {
        type: Sequelize.INTEGER,
      },
      clickCount: {
        type: Sequelize.INTEGER,
      },
      timeGame: {
        type: Sequelize.STRING,
      },
      accuracy: {
        type: Sequelize.INTEGER,
      },
      wordsPmin: {
        type: Sequelize.INTEGER,
      },
      charPsec: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  },
};
