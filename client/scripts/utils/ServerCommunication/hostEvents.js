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

  HostActions.requestNewRound.listen(() => {
    socket.emit(
      ev.requestNewRound,
      data => wrapper(HostActions.requestNewRound, data)
    );
  });

  HostActions.startGame.listen(() => {
    socket.emit(
      ev.startGame,
      data => wrapper(HostActions.startGame, data)
    );
  });

  HostActions.endRound.listen(() => {
    socket.emit(
      ev.endRound,
      data => wrapper(HostActions.endRound, data)
    );
  });
};

const outgoing = (socket) => {
  let ev = events.toServer.fromHost;

  HostActions.listPlayers.listen(data => socket.emit(ev.listPlayers, data));
  HostActions.showQuestion.listen(() => socket.emit(ev.showQuestion));
  HostActions.givePoints.listen(data => socket.emit(ev.givePoints, data));
};

const incoming = (socket) => {
  let ev = events.fromServer.toHost;

  socket.on(ev.playerJoined, HostActions.playerJoinedGame);
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
    HostActions.startGame.listen = nop;
    HostActions.endRound.listen = nop;
    HostActions.showQuestion.listen = nop;
    HostActions.givePoints.listen = nop;
    socket.off(events.fromServer.toHost.playerJoined);
  }
};
