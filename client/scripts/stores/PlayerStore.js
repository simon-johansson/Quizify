'use strict';

var Reflux = require('reflux');
var MobileDetect = require('mobile-detect');
var md = new MobileDetect(window.navigator.userAgent);

var ClientActions = require('../actions/ClientActionCreators');
var PlayerActions = require('../actions/PlayerActionCreators');
var browserStorage = require('../utils/BrowserStorage');

var PlayerStore = Reflux.createStore({
  listenables: PlayerActions,

  setInitialState() {
    this.state = {
      playerId: null,
      playerName: browserStorage.getPlayerName() || '',
      gameId: null,
      joindGame: false,
      players: [],
      latency: 0,
      isUsingMobile: md.mobile(),
    };
  },

  getState(){ return this.state; },
  getPlayerId(){ return this.state.playerId; },
  getPlayerName() { return this.state.playerName; },
  getGameId() { return this.state.gameId; },
  getPlayers() { return this.state.players; },
  hasJoinedGame() { return this.state.joindGame; },
  getLatency() { return this.state.latency; },
  isUsingMobile() { return this.state.isUsingMobile; },

  _onLatency(data) {
    var {state} = this;
    state.latency = data;
    this.trigger(state);
  },

  _onJoinedGame(data) {
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

  _listPlayers(data) {
    var {state} = this;
    state.players = data.players;
    this.trigger(state);
  },

  _onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    this.listenTo(ClientActions.latency, this._onLatency);

    this.listenTo(PlayerActions.joinGame.failed, this._onError);
    this.listenTo(PlayerActions.joinGame.completed, this._onJoinedGame);
    this.listenTo(PlayerActions.listPlayers, this._listPlayers);
  },

});

module.exports = PlayerStore;
