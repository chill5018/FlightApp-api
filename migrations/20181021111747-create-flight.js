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
    flightNumber: {
      type: Sequelize.STRING,
      validate: {
        is: '^[A-Za-z]{2}[0-9]{3}\z', // eslint-disable-line no-useless-escape
      },
    },
    departureDateTime: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
    arrivalDateTime: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
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
