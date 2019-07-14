var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var assert = require('assert');
var should = chai.should();

chai.use(chaiHttp);


describe('Array', function() { //lecture example
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Players', function(){
  it('should be an object', function(done){
    chai.request(server).get('/players').end(function(err, res){

      res.body.should.be.a('object');
      done();
    });
  });
});
