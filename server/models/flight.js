'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    id: {type:DataTypes.INTEGER,primaryKey:true},
    airlineIndex: DataTypes.INTEGER,
    flightNumber: DataTypes.STRING,
    departureDateTime: DataTypes.BIGINT,
    arrivalDateTime: DataTypes.BIGINT,
    destinationIndex: DataTypes.INTEGER,
    originIndex: DataTypes.INTEGER
  }, {});
  Flight.associate = function(models) {
    Flight.hasOne(models.Airline, {
      foreignKey:'airlineIndex'
    });
    Flight.hasOne(models.Airport, {
      foreignKey:'originIndex'
    });
    Flight.hasOne(models.Airport, {
      foreignKey:'destinationIndex'
    });
  };
  return Flight;
};