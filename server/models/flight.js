module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
<<<<<<< HEAD
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
=======
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
  }, {});

  Flight.associate = () => {
    // associations can be defined here
>>>>>>> master
  };

  return Flight;
};
