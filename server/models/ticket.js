module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isFloat: true,
        min: {
          args: [0],
          msg: 'Ticket Price cannot be less than zero',
        },
      },
    },
    departureFlight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    returnFlight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Flight, {
      foreignKey: 'departureFlight',
    });

    Ticket.belongsTo(models.Flight, {
      foreignKey: 'returnFlight',
    });
  };

  return Ticket;
};
