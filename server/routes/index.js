 const flightsController = require('../controllers').flights;
 const airlinesController = require('../controllers').airlines;
 const airportsController = require('../controllers').airports;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
   app.post('/api/airlines', airlinesController.create);
   app.get('/api/airlines', airlinesController.list);
   app.post('/api/airports', airportsController.create);
   app.get('/api/airports', airportsController.list);
   app.post('/api/flights', flightsController.create);
   app.get('/api/flights', flightsController.list);
  // app.get('/api/flights/:todoId', flightsController.retrieve);
  // app.put('/api/flights/:todoId', flightsController.update);
  // app.delete('/api/flights/:todoId', flightsController.destroy);
};
