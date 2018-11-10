module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    airlineIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    destinationIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
