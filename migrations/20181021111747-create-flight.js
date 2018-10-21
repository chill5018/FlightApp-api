

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airlineIndex: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Airlines',
          key: 'id'
        }
      },
      flightNumber: {
        type: Sequelize.STRING
      },
      departureDateTime: {
        type: Sequelize.BIGINT
      },
      arrivalDateTime: {
        type: Sequelize.BIGINT
      },
      destinationIndex: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Airports',
          key: 'id'
        }
      },
      originIndex: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Airports',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flights');
  }
};
