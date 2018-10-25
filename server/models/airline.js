module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define('Airline', {
    name: DataTypes.STRING,
  });

  Airline.associate = () => {
    // associations can be defined here
  };

  return Airline;
};
