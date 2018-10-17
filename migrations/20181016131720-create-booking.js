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
          model:'Flight',
          key:'id'
        }
      },
      returnFlightId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Flight',
          key:'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'User',
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