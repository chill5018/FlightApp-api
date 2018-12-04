module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[A-Za-z ]+$', 'i'],
      },
    },
    code: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
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
