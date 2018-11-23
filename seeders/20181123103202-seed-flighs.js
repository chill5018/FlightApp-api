

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Flights', [
    {
      flightNumber: 'SAS 418',
      departureDateTime: '2018-02-01T11:45:24.886Z',
      arrivalDateTime: '2018-02-01T20:45:24.886Z',
      airlineIndex: 3,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'DY 3118',
      departureDateTime: '2018-02-01T11:00:24.886Z',
      arrivalDateTime: '2018-02-01T20:45:24.886Z',
      airlineIndex: 4,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'AF 9182',
      departureDateTime: '2018-02-01T10:00:24.886Z',
      arrivalDateTime: '2018-02-01T19:30:24.886Z',
      airlineIndex: 2,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'CAN 5312',
      departureDateTime: '2018-02-01T12:00:24.886Z',
      arrivalDateTime: '2018-02-01T22:50:24.886Z',
      airlineIndex: 1,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'SAS 418',
      departureDateTime: '2018-02-02T11:45:24.886Z',
      arrivalDateTime: '2018-02-02T20:45:24.886Z',
      airlineIndex: 3,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'DY 3118',
      departureDateTime: '2018-02-02T11:00:24.886Z',
      arrivalDateTime: '2018-02-02T20:45:24.886Z',
      airlineIndex: 4,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'AF 9182',
      departureDateTime: '2018-02-02T10:00:24.886Z',
      arrivalDateTime: '2018-02-02T19:30:24.886Z',
      airlineIndex: 2,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'CAN 5312',
      departureDateTime: '2018-02-02T12:00:24.886Z',
      arrivalDateTime: '2018-02-02T22:50:24.886Z',
      airlineIndex: 1,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'SAS 418',
      departureDateTime: '2018-02-03T11:45:24.886Z',
      arrivalDateTime: '2018-02-03T20:45:24.886Z',
      airlineIndex: 3,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'DY 3118',
      departureDateTime: '2018-02-03T11:00:24.886Z',
      arrivalDateTime: '2018-02-03T20:45:24.886Z',
      airlineIndex: 4,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'AF 9182',
      departureDateTime: '2018-02-03T10:00:24.886Z',
      arrivalDateTime: '2018-02-03T19:30:24.886Z',
      airlineIndex: 2,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'CAN 5312',
      departureDateTime: '2018-02-03T12:00:24.886Z',
      arrivalDateTime: '2018-02-03T22:50:24.886Z',
      airlineIndex: 1,
      destinationIndex: 1, // airport id
      originIndex: 5, // airport id
    },
    {
      flightNumber: 'SAS 4581',
      departureDateTime: '2018-02-10T18:45:24.886Z',
      arrivalDateTime: '2018-02-11T10:45:24.886Z',
      airlineIndex: 3,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'DY 2413',
      departureDateTime: '2018-02-10T19:00:24.886Z',
      arrivalDateTime: '2018-02-11T11:45:24.886Z',
      airlineIndex: 4,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'AF 2232',
      departureDateTime: '2018-02-10T20:00:24.886Z',
      arrivalDateTime: '2018-02-11T13:30:24.886Z',
      airlineIndex: 2,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'CAN 5349',
      departureDateTime: '2018-02-01T19:00:24.886Z',
      arrivalDateTime: '2018-02-01T10:50:24.886Z',
      airlineIndex: 1,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'SAS 928',
      departureDateTime: '2018-02-11T17:45:24.886Z',
      arrivalDateTime: '2018-02-12T10:45:24.886Z',
      airlineIndex: 3,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'DY 3913',
      departureDateTime: '2018-02-11T19:00:24.886Z',
      arrivalDateTime: '2018-02-12T11:45:24.886Z',
      airlineIndex: 4,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'AF 9182',
      departureDateTime: '2018-02-11T18:00:24.886Z',
      arrivalDateTime: '2018-02-12T12:30:24.886Z',
      airlineIndex: 2,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'CAN 5122',
      departureDateTime: '2018-02-11T17:00:24.886Z',
      arrivalDateTime: '2018-02-02T11:50:24.886Z',
      airlineIndex: 1,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'SAS 4418',
      departureDateTime: '2018-02-13T19:45:24.886Z',
      arrivalDateTime: '2018-02-14T10:45:24.886Z',
      airlineIndex: 3,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'DY 3178',
      departureDateTime: '2018-02-13T17:00:24.886Z',
      arrivalDateTime: '2018-02-14T10:45:24.886Z',
      airlineIndex: 4,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'AF 9122',
      departureDateTime: '2018-02-13T18:00:24.886Z',
      arrivalDateTime: '2018-02-14T09:30:24.886Z',
      airlineIndex: 2,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
    {
      flightNumber: 'CAN 5210',
      departureDateTime: '2018-02-13T20:00:24.886Z',
      arrivalDateTime: '2018-02-14T13:50:24.886Z',
      airlineIndex: 1,
      destinationIndex: 5, // airport id
      originIndex: 1, // airport id
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Flights', null, {}),
};
