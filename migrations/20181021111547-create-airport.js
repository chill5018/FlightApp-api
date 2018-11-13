module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Airports', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: Sequelize.STRING,
    code: {
      type: Sequelize.STRING,
      validate: {
        len: [3, 3],
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Airports'),
};
