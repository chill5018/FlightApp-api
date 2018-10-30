const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Airports controller', function() {
    it('should list ALL airports on /airports GET');
    it('should add a SINGLE airline on /airports POST');
});