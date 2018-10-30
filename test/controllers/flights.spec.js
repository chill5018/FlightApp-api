const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Flights controller', function() {
    it('should list ALL flights on /flights GET');
    it('should add a SINGLE airline on /flights POST');
});