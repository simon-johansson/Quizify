'use strict';

var _ = require('lodash');
var Reflux = require('reflux');

var ClientActions = require('../actions/ClientActionCreators');
var HostActions = require('../actions/HostActionCreators');
var PlayerActions = require('../actions/PlayerActionCreators');

var HostStore = Reflux.createStore({
  listenables: [HostActions, PlayerActions, ClientActions],

  setInitialState() {
    this.state = {
      gameId: null,
      players: []
    };
  },

  getPlayers() {
    return this.state.players;
  },

  getGameId() {
    return this.state.gameId;
  },

  onGameCreated(data) {
    var {state} = this;
    state.gameId = data.gameId;
    this.trigger(state);
  },

  onPLayerJoined(data) {
    let {state} = this;
    let {playerId, playerName} = data;
    state.players.push({
      playerId, playerName
    });
    this.trigger(state);
  },

  onPlayerLeftGame(data) {
    let {state} = this;
    let {clientId} = data;
    state.players = state.players.filter(function(o) {
      return o.playerId !== clientId;
    });
    this.trigger(state);
  },

  // Maybe a good idea to move all the errors out to
  // a seperate store?
  onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    this.listenTo(HostActions.createGame.completed, this.onGameCreated);
    this.listenTo(HostActions.createGame.failed, this.onError);

    this.listenTo(PlayerActions.joinGame.completed, this.onPLayerJoined);

    this.listenTo(ClientActions.leaveGame.completed, this.onPlayerLeftGame);
  },

});

module.exports = HostStore;
