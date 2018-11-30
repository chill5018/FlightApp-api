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

  list(req, res) {
    let dep_city = req.query.departureCity;
    let arr_city = req.query.arrivalCity;
    let dep_date = req.query.departureDate;
    let arr_date = req.query.arrivalDate;
    
    // if no query params, return all flights
    if(dep_date == null || dep_city == null || arr_date == null){
      return Flight
      .all()
      .then(flights => res.status(200).send(flights))
      .catch(error => res.status(400).send(error));
    }
      var getdep_id =
      Airport
     .findOne(
       {where : {name: dep_city}}
     )
     .then(function(airport){
       return airport.id;
     });

     var get_bothIds = 
     getdep_id.then(function(id){
      Airport
      .findOne(
        {where : {name: arr_city}}
      )
      .then(function(airport){
        return [id, airport.id];
      })
      .then(([a,b]) => {
        
        return Flight
        .findAll({
          where: {[Op.and]: [{departureDateTime : {'$gte': new Date(dep_date)}}, {originIndex : a} ,{destinationIndex : b}]}
        })
        .then(flights => res.status(200).send(flights))
        .catch(error => res.status(400).send(error));
     });
    });
  },
}
  
