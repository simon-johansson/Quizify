'use strict';

var _ = require('lodash');
var Reflux = require('reflux');

var ClientActions = require('../actions/ClientActionCreators');
var HostActions = require('../actions/HostActionCreators');
var PlayerActions = require('../actions/PlayerActionCreators');

const createDeepLink = (url, id) => `${url}/#/player/${id}`;

class Round {
  constructor(track) {
    this.hasEnded = false;
    this.isShowing = false;
    this.track = track;
  }
}

var HostStore = Reflux.createStore({
  listenables: [HostActions, PlayerActions, ClientActions],

  setInitialState() {
    this.state = {
      url: "",
      deepLink: "",
      gameId: null,
      players: [],
      countdown: 10,
      rounds: [],
      currentRound: {
        hasEnded: false,
        isShowing: false,
        track: {}
      },
      roundsPlayed: 0,
    };
  },

  getPlayers() { return this.state.players; },
  getGameId() { return this.state.gameId; },
  getSiteUrl() { return this.state.url; },
  getGameDeepLink() { return this.state.deepLink; },
  getTrack() { return this.state.track; },
  getCountdown() { return this.state.countdown; },
  getRounds() { return this.state.rounds; },
  getCurrentRound() { return this.state.currentRound; },
  getRoundsPlayed() { return this.state.roundsPlayed; },

  _onGameCreated(data) {
    var {state} = this;
    state.gameId = data.gameId;
    state.url = data.url;
    state.deepLink = createDeepLink(data.url, data.gameId);
    this.trigger(state);
  },

  _onPLayerJoined(data) {
    let {state} = this;
    let {playerId, playerName} = data;
    state.players.push({
      playerId, playerName
    });
    this.trigger(state);
  },

  _onPlayerLeftGame(data) {
    let {state} = this;
    let {clientId} = data;
    state.players = state.players.filter(function(o) {
      return o.playerId !== clientId;
    });
    this.trigger(state);
  },

  _onStartNewRound(data) {
    let {state} = this;
    state.track = data.track;
    this.trigger(state);
  },

  _onStartGame(data) {
    let {state} = this;
    let round = new Round(data.track);
    state.rounds.push(round);
  },

  _onEndRound() {
    let {state} = this;
    state.currentRound.hasEnded = true;
    state.roundsPlayed += 1;
    this.trigger(state);
  },

  _onShowQuestion() {
    let {state} = this;
    state.currentRound = state.rounds[state.rounds.length - 1];
    state.currentRound.isShowing = true;
    this.trigger(state);
  },

  // Maybe a good idea to move all the errors out to
  // a seperate store?
  onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    this.listenTo(HostActions.createGame.completed, this._onGameCreated);
    this.listenTo(HostActions.createGame.failed, this._onError);
    this.listenTo(HostActions.requestNewRound.completed, this._onStartNewRound);
    this.listenTo(HostActions.requestNewRound.failed, this._onError);
    this.listenTo(HostActions.startGame.completed, this._onStartGame);
    this.listenTo(HostActions.startGame.failed, this._onError);
    this.listenTo(HostActions.endRound, this._onEndRound);
    this.listenTo(HostActions.endRound.completed, this._onStartGame);
    this.listenTo(HostActions.endRound.failed, this._onError);
    this.listenTo(HostActions.playerJoinGame, this._onPLayerJoined);
    this.listenTo(HostActions.showQuestion, this._onShowQuestion);

    this.listenTo(ClientActions.leaveGame.completed, this.onPlayerLeftGame);
  },

});

module.exports = HostStore;
