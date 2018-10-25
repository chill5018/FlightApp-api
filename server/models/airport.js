module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  });

  Airport.associate = () => {
    // associations can be defined here
  };

  return Airport;
};
