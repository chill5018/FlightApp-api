module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    price: {
      type:DataTypes.DOUBLE,
      validate: {
        isFloat:true,
      },
    },
    departureFlight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Flight, { // //'flightIndex' will be added on Ticket , not Flight
      foreignKey: 'departureFlight',
    });
    Ticket.belongsTo(models.Flight, { // //'flightIndex' will be added on Ticket , not Flight
    foreignKey: 'returnFlight',
  });
  };

  return Ticket;
};
