'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    id: DataTypes.STRING,
    date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING
  }, {});
  Flight.associate = function(models) {
    // associations can be defined here
  };
  return Flight;
};