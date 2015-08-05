'use strict';

var socket = require('socket.io-client')();
var socketEvents = require('shared/socketEvents');

var ClientActions = require('actions/ClientActionCreators');
var HostActions = require('actions/HostActionCreators');
var PlayerActions = require('actions/PlayerActionCreators');

/**
 * @param  {{gameId: string}} data
 */
var hostCreatedGame = (data) => {
  let {failed, completed} = HostActions.createGame;
  return data.errorMessage ? failed(data.errorMessage) : completed(data);
};

/**
 * @param  {{gameId: string, playerName: string, playerId: string}} data
 */
var joinedGame = (data) => {
  let {failed, completed} = PlayerActions.joinGame;
  return data.errorMessage ? failed(data.errorMessage) : completed(data);
};

var playersListed = (data) => {
  console.log("Players Listed");
  console.log(data);
};

/**
 * @param  {{id: string}} data
 */
var clientLeftGame = (data) => {
  let {failed, completed} = ClientActions.leaveGame;
  return data.errorMessage ? failed(data.errorMessage) : completed(data);
};

var bindEvents = () => {

  HostActions.createGame.listen( () => {
    socket.emit(socketEvents.client.host.createGame);
  });

  HostActions.listPlayers.listen( (data) => {
    socket.emit(socketEvents.client.host.listPlayers, data);
  });

  PlayerActions.joinGame.listen( (playerName, gameId) => {
    socket.emit(socketEvents.client.player.joinGame, {playerName, gameId});
  });

  ClientActions.leaveGame.listen( (playerName, gameId) => {
    socket.emit(socketEvents.client.leaveGame, {playerName, gameId});
  });

  socket.on(socketEvents.server.gameCreated, hostCreatedGame);
  socket.on(socketEvents.server.playerJoined, playerJoinedGame);
  socket.on(socketEvents.server.clientLeft, clientLeftGame);
  socket.on(socketEvents.server.listPlayers, playersListed);
};

var WebSocketService = {
  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
    bindEvents();
  }
};

module.exports = WebSocketService;
