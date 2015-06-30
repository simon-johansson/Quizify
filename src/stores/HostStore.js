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

    socket.on(socketEvents.server.userJoined, (data) => {
      var {state} = this;  
      state.users.push({
        playerId: data.playerId,
        playerName: data.playerName
      });
      this.trigger(state);
    });
  },

});

module.exports = HostStore;
