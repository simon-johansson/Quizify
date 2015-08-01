'use strict';

var Reflux = require('reflux');
var PlayerActions = require('../actions/PlayerActionCreators');
var browserStorage = require('../utils/BrowserStorage');

var PlayerStore = Reflux.createStore({
  listenables: PlayerActions,

  setInitialState() {
    this.state = {
      playerId: null,
      playerName: browserStorage.getPlayerName() || null,
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
    state.joindGame = true;
    if(state.playerName !== data.playerName) {
      state.playerName = data.playerName;
      browserStorage.setPlayerName(data.playerName);
    }
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
