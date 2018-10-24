module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tickets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    price: Sequelize.DOUBLE,
    flightIndex: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Flights',
        key: 'id',
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
  down: (queryInterface) => queryInterface.dropTable('Tickets'),
};
