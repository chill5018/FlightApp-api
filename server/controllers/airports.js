const { Airport } = require('../models');

module.exports = {
  create(req, res) {
    return Airport
      .create({
        name: req.body.name,
        code: req.body.code,
      })
      .then((airport) => res.status(201).send(airport))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Airport
      .all()
      .then(airports => res.status(200).send(airports))
      .catch(error => res.status(400).send(error));
  },
};
