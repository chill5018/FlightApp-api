const Flight = require('../models').Flight;

module.exports = {
  create(req, res) {
    return Flight
      .create({
        date: req.body.date,
        duration: req.body.duration,
        from: req.body.from,
        to: req.body.to,
      })
      .then((flight) => res.status(201).send(flight))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Flight
      .findAll({
        include: [{
          model: Flight,
          as: 'flights',
        }],
        order: [
          [{ model: Flight, as: 'flights' }, 'ASC'],
        ],
      })
      .then((flights) => res.status(200).send(flights))
      .catch((error) => res.status(400).send(error));
  },
};
