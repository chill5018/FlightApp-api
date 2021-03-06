module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tickets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    price: Sequelize.DOUBLE,
    departureFlight: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Flights',
        key: 'id',
      },
    },
    returnFlight: {
      allowNull: true,
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
