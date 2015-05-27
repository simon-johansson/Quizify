'use strict';

var socketIO = require('socket.io');
// var client = require('socket.io-client');
var io;

function bindEvents () {
  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
}

function init (server) {
  io = socketIO(server);
  bindEvents();
}

module.exports = {
  init: init,
};
