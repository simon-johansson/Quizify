'use strict';

var Reflux = require('reflux');
var PlayerActions = require('../actions/PlayerActionCreators');

var PlayerStore = Reflux.createStore({
  listenables: PlayerActions,

  setInitialState() {
    this.state = {
      playerId: null,
      playerName: null,
      gameId: null,
      joindGame: false
    };
  },

  getPlayerId(){ return this.state.playerId; },
  getPlayerName() { return this.state.playerName; },
  getGameId() { return this.state.gameId; },

  _onPLayerJoined(data) {
    var {state} = this;
    state.gameId = data.gameId;
    state.playerId = data.playerId;
    state.playerName = data.playerName;
    state.joindGame = true;
    this.trigger(state);
  },

  _onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    this.listenTo(PlayerActions.joinGame.failed, this._onError);
    this.listenTo(PlayerActions.joinGame.completed, this._onPLayerJoined);
  },

});

module.exports = PlayerStore;
