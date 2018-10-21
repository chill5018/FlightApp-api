'use strict';
module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    id: {type:DataTypes.INTEGER,primaryKey:true},
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  Airport.associate = function(models) {
    // associations can be defined here
  };
  return Airport;
};