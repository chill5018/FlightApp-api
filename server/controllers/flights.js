const { Flight } = require('../models');
const { Airport } = require('../models');
const Sequelize = require('sequelize');
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

  getById(req, res) {
    return Flight
      .findOne(
        { where: { id: req.params.id } }
      )
      .then(flight => res.status(200).send(flight))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const hasQueryParams = !!Object.keys(req.query).length;

    // Return all flight if there are no query params
    if (!hasQueryParams) {
      return Flight
        .all()
        .then(flights => res.status(200).send(flights))
        .catch(error => res.status(400).send(error));
    }

    let { departureCity } = req.query;
    let { arrivalCity } = req.query;
    let { departureDate } = req.query;
    let { returnDate } = req.query;

    const isReturn = !!departureCity && !!arrivalCity && !!departureDate && !!returnDate;

    const getDepartureAirportId = Airport.findOne({ where: { name: departureCity } })
        .then(function (airport) {
          return airport.id;
        });

    getDepartureAirportId.then(function (departureAirportId) {
        Airport
          .findOne({ where: { name: arrivalCity } })
          .then(function (arrivalAirport) {
            return [departureAirportId, arrivalAirport.id];
          })
          .then(([a, b]) => {
            return Flight
              .findAll({
                where: { [Op.and]: [{ departureDateTime: { '$gte': new Date(departureDate) } }, { departureDateTime: { '$lt': getNextDay(departureDate) } }, { originIndex: a }, { destinationIndex: b }] }
              })
              .then(flights => {
                if (returnDate == null) {
                  res.status(200).send(flights);
                } else {
                  return Flight
                    .findAll({
                      where: { [Op.and]: [{ departureDateTime: { '$gte': new Date(returnDate) } }, { departureDateTime: { '$lt': getNextDay(returnDate) } }, { originIndex: b }, { destinationIndex: a }] }
                    })
                    .then(results => {
                      const formattedData = makePairs(flights, results);
                      return res.status(200).send(formattedData);
                    })
                }
              }).catch(error => res.status(400).send(error));
          });
      });
  },
}

function makePairs(departureFlights, returnFlights) {
  let pairs = [];

  for (let i = 0; i < departureFlights.length; i++) {
    for (let j = 0; j < returnFlights.length; j++) {
      const departureFlightResult = departureFlights[i];
      const returnFlightResult = returnFlights[i];

      const flight = {
        departureFlight: departureFlightResult,
        returnFlight: returnFlightResult
      }

      pairs.push(flight);
    }
  }

  return pairs;
}

function getNextDay(date) {
  return new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
}

