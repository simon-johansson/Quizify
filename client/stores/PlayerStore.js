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

  getPlayerId(){ return this.state.playerId },
  getPlayerName() { return this.state.playerName },
  getLobbyId() { return this.state.lobbyId },

  _onPLayerJoined(data) {
    var {state} = this;
    state.lobbyId = data.lobbyId;
    state.playerId = data.playerId;
    state.playerName = data.playerName;
    this.trigger(state);
  },

  _onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    // this.listenTo(PlayerActions.joinLobby, this.onPLayerJoined);
    this.listenTo(PlayerActions.joinLobby.failed, this._onError);
    this.listenTo(PlayerActions.joinLobby.completed, this._onPLayerJoined);
  },

});

module.exports = PlayerStore;
