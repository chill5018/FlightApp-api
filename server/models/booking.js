module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    airlineIndex: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    flightNumber: {
      type: DataTypes.STRING,
      foreignKey: true
    },
    departureDateTime: {
      type: DataTypes.BIGINT
    },
    arrivalDateTime: {
      type: DataTypes.BIGINT
    },
    destinationIndex: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    originIndex: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  }, {});

  Booking.associate = (models) => {
    Booking.hasOne(models.Airline, {
      foreignKey:'id',
      as:'airlineIndex'
    });
    Booking.hasOne(models.Airport, {
     foreignKey:'id',
     as:'destinationIndex'
   });
   Booking.hasOne(models.Airport, {
    foreignKey:'id',
    as:'originIndex'
  });
  };

  return Booking;
};
