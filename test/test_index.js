var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;

// page access
var request = require('request');
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

// player
var players = require('../index.js').players;
describe('players', function(){
  it('object', ()=>{
    expect(players).to.be.an('object');
  });
});

// connection
var io = require('socket.io-client');
var options = {
  transports: ['websocket'], // localhost
  'force new connection': true, // brute force
}
describe('connection', ()=>{
  it('username, movement', ()=>{
    function check_chat(client){
      client.on('username', (username)=>{
        assert.isNumber(username);
      });
      client.disconnect();
    }
    function check_movement(client){
      client.on('playerMovement', (movementData)=>{
        assert.isNumber(movementData.x);
        assert.isNumber(movementData.y);
        expect(movementData.f).to.be.oneOf([1,2,3,4], '!direction');
        expect(movementData.dashed).to.be.oneOf([0,1], '!dashed');
      });
      client.disconnect();
    }
    function check_health(client){
      client.on('shuri_kill', (ninja)=>{
        assert.isTrue(players[ninja.id].health<=0);
      });
      client.disconnect();
    }
    function tests(client){
      check_chat(client);
      check_movement(client);
      check_health(client);
    }
    var client1 = io.connect('http://localhost:5000', options);
    var client2 = io.connect('http://localhost:5000', options);
    tests(client1);
    tests(client2);
  });
});