module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 3],
      },
      allowNull: false,
    },
  });

  Airport.associate = () => {
    // associations can be defined here
  };

  return Airport;
};
