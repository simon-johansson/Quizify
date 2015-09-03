'use strict';

var socketIO = require('socket.io');
var nop = require('nop');
var ev = require('../../../shared/socketEvents');
var config = require('../../config/environment');
var spotify = require('../spotify');
var io;

function onHostCreateGame(callback = nop) {
  let gameId = `${Math.floor(Math.random() * 100000)}`;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    return onHostCreateGame();
  }
  this.join(gameId);
  this.gameId = gameId;
  // console.log(`new game created with ID: ${gameId}`);
  callback({
    gameId,
    url: config.url
  });
}

function onPlayerJoinGame(data, callback = nop) {
  let {gameId, playerName} = data;
  let playerId = this.id;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    this.join(gameId);
    this.gameId = gameId;
    // console.log(`New player (${playerName}) joined game: ${gameId}`);
    var obj = { gameId, playerName, playerId }
    io.to(gameId).emit(ev.fromServer.toHost.playerJoined, obj);
  } else {
    let errorMessage = `Game ${gameId} does not exist`;
    var obj = { errorMessage };
    // console.log(`Error: Player attempted to join room (${errorMessage}) that could not be found`);
  }
  callback(obj);
}

function onClientLeave() {
  let clientId = this.id;
  let gameId = this.gameId;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    if(!this.disconnected) {
      this.leave(gameId);
      this.gameId = null;
    }
    // console.log(`Client (${id}) disconnected from game: ${gameId}`);
    io.to(gameId).emit(ev.fromServer.toClient.leaveGame, { clientId });
  }
}

function onListPlayers(data) {
  let gameId = this.gameId;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    io.to(gameId).emit(ev.fromServer.toPlayer.listPlayers, data);
  }
}

const emitTrack = (gameId, event, callback) => {
  spotify.getTrack((err, track) => {
    if(err) {
      var obj = { errorMessage: err.message };
    } else {
      var obj = { track }
      io.to(gameId).emit(event, track);
    }
    callback(obj);
  });
}

function onEndRound(callback = nop) {
  let gameId = this.gameId;
  let event = ev.fromServer.toPlayer.newRound;
  emitTrack(gameId, event, callback);
}

function onStartGame(callback = nop) {
  let gameId = this.gameId;
  let event = ev.fromServer.toPlayer.newRound;
  emitTrack(gameId, event, callback);
}

// function onStartGame(callback = nop) {
//   let gameId = this.gameId;
//   // if(io.nsps['/'].adapter.rooms[gameId]) {
//     spotify.getTrack((err, track) => {
//       if(err) {
//         var obj = { errorMessage: err.message };
//       } else {
//         var obj = { track }
//         io.to(gameId).emit(ev.fromServer.toPlayer.newRound, track);
//       }
//       callback(obj);
//     });
//   // }
// }

// function onEndRound(callback = nop) {
//   let gameId = this.gameId;
//   if(io.nsps['/'].adapter.rooms[gameId]) {
//     spotify.getTrack((err, track) => {
//       if(err) {
//         var obj = { errorMessage: err.message };
//       } else {
//         var obj = { track }
//         io.to(gameId).emit(ev.fromServer.toPlayer.newRound, track);
//       }
//       callback(obj);
//     });
//   }
// }

function onShowQuestion() {
  let gameId = this.gameId;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    io.to(gameId).emit(ev.fromServer.toPlayer.showQuestion);
  }
}

function onGivePoints(data) {
  // let gameId = this.gameId;
  let playerId = data.playerId;
  if(io.nsps['/'].adapter.rooms[playerId]) {
    io.to(playerId).emit(ev.fromServer.toPlayer.getPoints, {points: 300});
  }
}

function bindEvents (socket) {
  let {fromHost, fromPlayer, fromClient} = ev.toServer;
  socket.on(fromHost.createGame, onHostCreateGame);
  socket.on(fromHost.listPlayers, onListPlayers);
  // socket.on(fromHost.requestNewRound, onRequestNewRound);
  socket.on(fromHost.startGame, onStartGame);
  socket.on(fromHost.endRound, onEndRound);
  socket.on(fromHost.showQuestion, onShowQuestion);
  socket.on(fromHost.givePoints, onGivePoints);

  socket.on(fromPlayer.joinGame, onPlayerJoinGame);

  socket.on(fromClient.leaveGame, onClientLeave);
  socket.on(fromClient.ping, function(callback = nop) {
    setTimeout(() => {
      callback();
    }, 0)
  });
  socket.on('disconnect', onClientLeave);
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', (socket) => {
      bindEvents(socket);
    });
  },
  getClientsInRoom(gameId) {
    const {rooms} = io.nsps['/'].adapter;

    if(rooms[gameId]) {
      return Object.keys(rooms[gameId]).length;
    } else {
      return 0;
    }
  }
};
