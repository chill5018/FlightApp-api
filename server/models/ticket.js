'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: {type:DataTypes.INTEGER,primaryKey:true},
    price: DataTypes.DOUBLE,
    flightIndex: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    Ticket.hasOne(models.Flight, {
      foreignKey:'flightIndex'
    });
  };
  return Ticket;
};