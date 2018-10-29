const Airline = require('../models').Airline;

module.exports = {
  create(req, res) {
    return Airline
      .create({
        name: req.body.name,
      })
      .then((airline) => res.status(201).send(airline))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Airline
      .all()
      .then(airlines => res.status(200).send(airlines))
      .catch(error => res.status(400).send(error));
  },
};
