'use strict';

var socket = require('socket.io-client')();

var clientEvents = require('./clientEvents');
var hostEvents = require('./hostEvents');
var playerEvents = require('./playerEvents');

module.exports = {
  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
  },
  bindClientEvents: clientEvents.bind,
  bindHostEvents: hostEvents.bind,
  bindPlayerEvents: playerEvents.bind,
};
