'use strict';
module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define('Airline', {
    id: {type:DataTypes.INTEGER, primaryKey:true},
    name: DataTypes.STRING
  }, {});
  Airline.associate = function(models) {
    // associations can be defined here
  };
  return Airline;
};