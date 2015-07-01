'use strict';

var Reflux = require('reflux');
var PlayerActions = require('../actions/PlayerActionCreators');

var PlayerStore = Reflux.createStore({
  listenables: PlayerActions,

  setInitialState() {
    this.state = {
      playerId: null,
      playerName: null,
      lobbyId: null
    };
  },

  onPLayerJoined(data) {
    var {state} = this;
    state.lobbyId = data.lobbyId;
    state.playerId = data.playerId;
    state.playerName = data.playerName;
    this.trigger(state);
  },

  init() {
    this.setInitialState();

    // this.listenTo(PlayerActions.joinLobby, this.onPLayerJoined);
    // this.listenTo(PlayerActions.joinLobby.failed, this.onPLayerJoined);
    this.listenTo(PlayerActions.joinLobby.completed, this.onPLayerJoined);
  },

});

module.exports = PlayerStore;
