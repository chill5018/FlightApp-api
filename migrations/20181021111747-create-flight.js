module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Flights', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    airlineIndex: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Airlines',
        key: 'id',
      },
    },
    flightNumber: Sequelize.STRING,
    departureDateTime: Sequelize.BIGINT,
    arrivalDateTime: Sequelize.BIGINT,
    destinationIndex: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Airports',
        key: 'id',
      },
    },
    originIndex: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Airports',
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
  down: (queryInterface) => queryInterface.dropTable('Flights'),
};
