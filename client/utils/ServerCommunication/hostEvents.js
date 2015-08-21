'use strict';

const nop = require('nop');
const events = require('shared/socketEvents');
const HostActions = require('actions/HostActionCreators');
const {wrapper} = require('./utils');

const bouncing = (socket) => {
  let ev = events.toServer.fromHost;

  HostActions.createGame.listen(() => {
    socket.emit(
      ev.createGame,
      data => wrapper(HostActions.createGame, data)
    );
  });
};

const outgoing = (socket) => {
  let ev = events.toServer.fromHost;

  HostActions.requestNewRound.listen(() => socket.emit(ev.requestNewRound));
  HostActions.listPlayers.listen(data => socket.emit(ev.listPlayers, data));
};

const incoming = (socket) => {
  let ev = events.fromServer.toHost;

  socket.on(ev.playerJoined, HostActions.playerJoinGame);
};

module.exports = {
  bind(socket) {
    bouncing(socket);
    outgoing(socket);
    incoming(socket);
  },

  unbind(socket) {
    HostActions.createGame.listen = nop;
    HostActions.requestNewRound.listen = nop;
    HostActions.listPlayers.listen = nop;
    socket.off(events.fromServer.toHost.playerJoined);
  }
};
