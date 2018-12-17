module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define('Airline', {
    name: {
      type: DataTypes.STRING,
      validate: {
        is: '^[a-zA-Z ]*$',
      },
    },
  });

  Airline.associate = () => {
    // associations can be defined here
  };

  return Airline;
};
