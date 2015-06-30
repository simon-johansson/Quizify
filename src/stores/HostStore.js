'use strict';

var socket = require('../utils/socket');
var socketEvents = require('../../common/socketEvents');

var Reflux = require('reflux');
var Actions = require('../actions/HostActionCreators');

var HostStore = Reflux.createStore({
  listenables: Actions,

  setInitialState() {
    this.state = {
      lobbyId: null,
      players: []
    };
  },

  getPlayers() {
    return this.state.players;
  },

  getLobbyId() {
    return this.state.lobbyId;
  },

  onCreateLobby() {
    socket.emit(socketEvents.client.host.createLobby);
  },

  onLobbyCreated(data) {
    var {state} = this;
    state.lobbyId = data.lobbyId;
    this.trigger(state);
  },

  init() {
    this.setInitialState();

    // bind socket events
    socket.on(socketEvents.server.lobbyCreated, this.onLobbyCreated);
  },

});

module.exports = HostStore;
