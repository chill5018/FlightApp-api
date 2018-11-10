module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING(3),
  });

  Airport.associate = () => {
    // associations can be defined here
  };

  return Airport;
};
