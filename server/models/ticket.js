module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    price: DataTypes.DOUBLE,
    flightIndex: DataTypes.INTEGER,
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Flight, { // //'flightIndex' will be added on Ticket , not Flight
      foreignKey: 'flightIndex',
    });
  };

  return Ticket;
};
