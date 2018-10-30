module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    price: DataTypes.DOUBLE,
    flightIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Flight, { // //'flightIndex' will be added on Ticket , not Flight
      foreignKey: 'flightIndex',
    });
  };

  return Ticket;
};
