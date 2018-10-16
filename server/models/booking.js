'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    flightId: DataTypes.INTEGER,
    returnFlightId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    seat: DataTypes.STRING
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User);
    Booking.hasOne(models.Flight, {
      foreignKey: 'id',
      as:'flightId'
    });
    Booking.hasOne(models.Flight, {
      foreignKey: 'id',
      as:'returnFlightId'
    });
    Booking.hasOne(models.User, {
      foreignKey:'id',
      as:'userId'
    });
    
  };
  return Booking;
};