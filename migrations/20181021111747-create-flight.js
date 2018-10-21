

module.exports = {
<<<<<<< HEAD:migrations/20181021111747-create-flight.js
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
=======
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    flightId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Flights',
        key: 'id',
      },
    },
    returnFlightId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Flights',
        key: 'id',
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    seat: {
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('Bookings'),
>>>>>>> master:migrations/20181016131720-create-booking.js
};
