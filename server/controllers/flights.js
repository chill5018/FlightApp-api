const Sequelize = require('sequelize');

const { Flight } = require('../models');
const { Airport } = require('../models');
const { Airline } = require('../models');

const Op = Sequelize.Op;

function makePairs(departureFlights, returnFlights) {
  const pairs = [];

  for (let i = 0; i < departureFlights.length; i++) {
    for (let j = 0; j < returnFlights.length; j++) {
      const departureFlightResult = departureFlights[i];
      const returnFlightResult = returnFlights[i];

      const flight = {
        departureFlight: departureFlightResult,
        returnFlight: returnFlightResult,
      };

      pairs.push(flight);
    }
  }

  return pairs;
}

function getNextDay(date) {
  return new Date(new Date(date).getTime() + (24 * 60 * 60 * 1000));
}

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

    const { departureCity } = req.query;
    const { arrivalCity } = req.query;
    const { departureDate } = req.query;
    const { returnDate } = req.query;

    const getDepartureAirportId = Airport.findOne({ where: { code: departureCity } })
      .then((airport) => airport.id);

    return getDepartureAirportId.then((departureAirportId) => {
      Airport
        .findOne({ where: { code: arrivalCity } })
        .then((arrivalAirport) => [departureAirportId, arrivalAirport.id])
        .then(([a, b]) => Flight
          .findAll({
            attributes: ['id', 'flightNumber', 'departureDateTime', 'arrivalDateTime', 'createdAt', 'updatedAt'],
            include: [{
              model: Airline,
              attributes: ['id', 'name'],
              as: 'airline'
            },
            {
              model: Airport,
              attributes: ['id', 'name', 'code'],
              as: 'destination'
            },
            {
              model: Airport,
              attributes: ['id', 'name', 'code'],
              as: 'origin'
            }],
            where: {
              [Op.and]: [
                { departureDateTime: { $gte: new Date(departureDate) } },
                { departureDateTime: { $lt: getNextDay(departureDate) } },
                { originIndex: a }, { destinationIndex: b }],
            },
          })
          .then(flights => {
            if (!returnDate) {
              const formattedFlights = flights.map(flight => {
                return {
                  departureFlight: flight,
                  returnFlight: null
                };
              });

              return res.status(200).send(formattedFlights);
            }
            return Flight
              .findAll({
                attributes: ['id', 'flightNumber', 'departureDateTime', 'arrivalDateTime', 'createdAt', 'updatedAt'],
                include: [{
                  model: Airline,
                  attributes: ['id', 'name'],
                  as: 'airline'
                },
                {
                  model: Airport,
                  attributes: ['id', 'name', 'code'],
                  as: 'destination'
                },
                {
                  model: Airport,
                  attributes: ['id', 'name', 'code'],
                  as: 'origin'
                }],
                where: {
                  [Op.and]: [
                    { departureDateTime: { $gte: new Date(returnDate) } },
                    { departureDateTime: { $lt: getNextDay(returnDate) } },
                    { originIndex: b }, { destinationIndex: a }],
                },
              })
              .then(results => {
                const formattedData = makePairs(flights, results);
                return res.status(200).send(formattedData);
              });
          }).catch(error => res.status(400).send(error)));
    });
  },
};
