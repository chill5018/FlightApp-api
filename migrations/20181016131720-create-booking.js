'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Flights',
          key:'id'
        }
      },
      returnFlightId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Flights',
          key:'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key:'id'
        }
      },
      seat: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Bookings');
  }
};