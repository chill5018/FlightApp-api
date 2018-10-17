module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    flightId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    returnFlightId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    seat: DataTypes.STRING,
  }, {});

  Booking.associate = (models) => {
    Booking.belongsTo(models.User);
    Booking.hasOne(models.Flight, {
      foreignKey: 'id',
    });
    Booking.hasOne(models.Flight, {
      foreignKey: 'id',
    });
    Booking.hasOne(models.User, {
      foreignKey: 'id',
    });
  };

  return Booking;
};
