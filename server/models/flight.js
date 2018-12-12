module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    airlineIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flightNumber: {
      type: DataTypes.STRING,
      validate: {
        is: '^[A-Z]{3}-[1-9]{4}?$',
      },
    },
    departureDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    arrivalDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    destinationIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    originIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
  });

  Flight.associate = (models) => {
    Flight.belongsTo(models.Airline, {
      as: 'airline',
      foreignKey: 'airlineIndex', // 'airlineIndex' will be added on Flight instead of Airline
    });

    Flight.belongsTo(models.Airport, { // 'originIndex' will be added on Flight
      as: 'origin',
      foreignKey: 'originIndex',
    });

    Flight.belongsTo(models.Airport, { // 'destinationIndex' will be added on Flight
      as: 'destination',
      foreignKey: 'destinationIndex',
    });
  };

  return Flight;
};
