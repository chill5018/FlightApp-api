module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define('Airline', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: '^[a-zA-Z ]*$',
      },
    },
  });

  return Airline;
};
