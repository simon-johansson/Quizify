'use strict';


var clientEvents = require('./clientEvents');
var hostEvents = require('./hostEvents');
var playerEvents = require('./playerEvents');
var socket = require('socket.io-client')();

module.exports = {
  setSocketInstance(newSocket){
    socket = newSocket;
  },
  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
  },
  bindClientEvents: () => clientEvents.bind(socket),
  bindHostEvents: () => hostEvents.bind(socket),
  bindPlayerEvents: () => playerEvents.bind(socket),
};


