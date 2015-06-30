'use strict';

var socket = require('../utils/socket');
var socketEvents = require('../../common/socketEvents');

var Reflux = require('reflux');
var Actions = require('../actions/PlayerActionCreators');

var PlayerStore = Reflux.createStore({
  listenables: Actions,

  setInitialState() {
    this.state = {
      playerId: null,
      playerName: null,
      lobbyId: null
    };
  },

  onJoinLobby(data) {
    this.state.playerName = data.playerName;
    this.state.lobbyId = data.lobbyId;
    socket.emit(socketEvents.client.player.joinLobby, this.state);
  },

  init() {
    this.setInitialState();

    socket.on(socketEvents.server.playerJoined, (data) => {
      var {state} = this;  
      state.playerId = data.playerId;    
      this.trigger(state);
    });
  },

});

module.exports = PlayerStore;
