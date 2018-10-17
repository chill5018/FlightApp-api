module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
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
  };

  return Flight;
};
