module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    price: {
      type:DataTypes.DOUBLE,
      validate: {
        isFloat:true,
      },
    },
    flightIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric:true,
      },
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Flight, { // //'flightIndex' will be added on Ticket , not Flight
      foreignKey: 'flightIndex',
    });
  };

  return Ticket;
};
