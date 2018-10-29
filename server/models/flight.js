module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    airlineIndex: DataTypes.INTEGER,
    flightNumber: DataTypes.STRING,
    departureDateTime: DataTypes.BIGINT,
    arrivalDateTime: DataTypes.BIGINT,
    destinationIndex: DataTypes.INTEGER,
    originIndex: DataTypes.INTEGER,
  });

  Flight.associate = (models) => {
    Flight.belongsTo(models.Airline, {
      foreignKey: 'airlineIndex', // 'airlineIndex' will be added on Flight instead of Airline
    });

    Flight.belongsTo(models.Airport, { // 'originIndex' will be added on Flight
      foreignKey: 'originIndex',
    });

    Flight.belongsTo(models.Airport, { // 'destinationIndex' will be added on Flight
      foreignKey: 'destinationIndex',
    });
  };

  return Flight;
};
