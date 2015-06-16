'use strict';

var socketIO = require('socket.io');
var io;

function bindEvents (socket) {
  socket.emit('init', 'welcome');
  socket.on('create_game', function (data) {
    console.log(`new game created for id ${data.id}`);
  });
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', bindEvents);
  }
};
