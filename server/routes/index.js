const flightsController = require('../controllers').flights;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  // app.post('/api/flights', flightsController.create);
  // app.get('/api/flights', flightsController.list);
  // app.get('/api/flights/:todoId', flightsController.retrieve);
  // app.put('/api/flights/:todoId', flightsController.update);
  // app.delete('/api/flights/:todoId', flightsController.destroy);
};