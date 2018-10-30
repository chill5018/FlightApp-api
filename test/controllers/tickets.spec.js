const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Tickets controller', function() {
    it('should list ALL tickets on /tickets GET');
    it('should add a SINGLE airline on /tickets POST');
});