var expect = require('chai').expect;
var assert = require('chai').assert;

var request = require('request');
// page access
describe('index page access', ()=>{
  it('status:200', (done)=>{
    request('http://localhost:5000', (err, res, body)=>{
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
describe('fake page access', ()=>{
  it('status:404', (done)=>{
    request('http://localhost:5000/fakepage', (err, res, body)=>{
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
// weather
var weather = require('../index.js').weather;
describe('weather', ()=>{
  it('one of the 6 possible weathers', ()=>{
    let result1 = weather;
    expect(result1).to.be.oneOf(['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Clear', 'Clouds']);
  });
});