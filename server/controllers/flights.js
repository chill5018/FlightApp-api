const { Flight } = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    return Flight
      .create({
        flightNumber: req.body.flightNumber,
        departureDateTime: req.body.departureDateTime,
        arrivalDateTime: req.body.arrivalDateTime,
        airlineIndex: req.body.airlineIndex,
        destinationIndex: req.body.destinationIndex, // airport id
        originIndex: req.body.originIndex, // airport id
      })
      .then((flight) => res.status(201).send(flight))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    let airportId = req.query.originIndex;
    let date = req.query.departureDate;
    
    if(airportId == null || date == null){
      return Flight
      .all()
      .then(flights => res.status(200).send(flights))
      .catch(error => res.status(400).send(error));
    }
    return Flight
      .findAll({
      where: {
        [Op.and]: [{departureDateTime : {'$gte': new Date(date)}}, {originIndex : airportId} ]
      },
    })
      .then(flights => res.status(200).send(flights))
      .catch(error => res.status(400).send(error));
  },
};
