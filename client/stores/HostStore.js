'use strict';

var _ = require('lodash');
var Reflux = require('reflux');

var ClientActions = require('../actions/ClientActionCreators');
var HostActions = require('../actions/HostActionCreators');
var PlayerActions = require('../actions/PlayerActionCreators');

const createDeepLink = (url, id) => `${url}/#/player/${id}`;

var HostStore = Reflux.createStore({
  listenables: [HostActions, PlayerActions, ClientActions],

  setInitialState() {
    this.state = {
      url: "",
      deepLink: "",
      gameId: null,
      players: [],
      track: null,
      countdown: 10
    };
  },

  getPlayers() { return this.state.players; },
  getGameId() { return this.state.gameId; },
  getSiteUrl() { return this.state.url; },
  getGameDeepLink() { return this.state.deepLink; },
  getTrack() { return this.state.track; },
  getCountdown() { return this.state.countdown; },

  onGameCreated(data) {
    var {state} = this;
    state.gameId = data.gameId;
    state.url = data.url;
    state.deepLink = createDeepLink(data.url, data.gameId);
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

  onStartNewRound(data) {
    let {state} = this;
    state.track = data.track;
    this.trigger(state);
  },

  onStartGame(data) {
    if(data) {
      let {state} = this;
      state.track = data.track;
      state.round = 0;
      this.trigger(state);
    }
  },

  onEndRound(data) {
    let {state} = this;
    state.track = data.track;
    state.round = state.round + 1;
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
    this.listenTo(HostActions.requestNewRound.completed, this.onStartNewRound);
    this.listenTo(HostActions.requestNewRound.failed, this.onError);
    this.listenTo(HostActions.startGame.completed, this.onStartGame);
    this.listenTo(HostActions.startGame.failed, this.onError);
    this.listenTo(HostActions.endRound.completed, this.onEndRound);
    this.listenTo(HostActions.endRound.failed, this.onError);
    this.listenTo(HostActions.playerJoinGame, this.onPLayerJoined);

    this.listenTo(ClientActions.leaveGame.completed, this.onPlayerLeftGame);
  },

});

module.exports = HostStore;
