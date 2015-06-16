'use strict';

var app = require('../../../server/main.js');
var io = require('socket.io-client');
var config = require('../../../server/config/environment');

var socketURL = `http://0.0.0.0:${config.port}`;
var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe("WebSocket communication",function(){
  var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.spy(global.console, "log");
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });

  it('Should be able to connect to server', function(done){
    var client = io.connect(socketURL, options);

    client.on('connect', function(data){
      done();
    });
  });

  it('Should receive "init" event upon connection', function(done){
    var client = io.connect(socketURL, options);

    client.on('init', function (data) {
      expect(data).to.be.eql('welcome');
      done();
    });
  });


  it('Should be able to create new game', function(done){
    var client = io.connect(socketURL, options);

    client.on('connect', function(data){

      client.emit('create_game', { id: 'abc123' });
      setTimeout(function () {
        expect(console.log).to.have.been.calledOnce;
        expect(console.log).to.have.been.calledWith('new game created for id abc123');
        done();
      }, 100);
    });
  });
});


