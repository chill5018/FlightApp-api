module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define('Airline', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Airline.associate = () => {
    // associations can be defined here
  };

  return Airline;
};
