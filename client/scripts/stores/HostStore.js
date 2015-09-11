'use strict';

import Reflux from 'reflux';

import ClientActions from 'actions/ClientActionCreators';
import HostActions from 'actions/HostActionCreators';
import PlayerActions from 'actions/PlayerActionCreators';
import Round from 'utils/models/Round';

const createDeepLink = (url, id) => `${url}/#/player/${id}`;

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

  getState() { return this.state; },
  getPlayers() { return this.state.players; },
  getGameId() { return this.state.gameId; },
  getSiteUrl() { return this.state.url; },
  getGameDeepLink() { return this.state.deepLink; },
  getTrack() { return this.state.track; },
  getCountdown() { return this.state.countdown; },
  getRounds() { return this.state.rounds; },
  getCurrentRound() { return this.state.currentRound; },
  getRoundsPlayed() { return this.state.roundsPlayed; },

  onCreateGameCompleted(data) {
    var {state} = this;
    state.gameId = data.gameId;
    state.url = data.url;
    state.deepLink = createDeepLink(data.url, data.gameId);
    this.trigger(state);
  },

  onPlayerJoinedGame(data) {
    let {state} = this;
    let {playerId, playerName} = data;
    state.players.push({playerId, playerName});
    this.trigger(state, 'playerJoinedGame');
  },

  onPlayerLeftGame(data) {
    let {state} = this;
    let {clientId} = data;
    state.players = state.players.filter(function(o) {
      return o.playerId !== clientId;
    });
    this.trigger(state);
  },

  onRequestNewRoundCompleted(data) {
    let {state} = this;
    state.track = data.track;
    this.trigger(state);
  },

  onStartGameCompleted(data) {
    let {state} = this;
    let round = new Round(data.track);
    state.rounds.push(round);
  },

  onEndRound() {
    let {state} = this;
    state.currentRound.hasEnded = true;
    state.roundsPlayed += 1;
    this.trigger(state);
  },

  onEndRoundCompleted(data) {
    let {state} = this;
    let round = new Round(data.track);
    state.rounds.push(round);
  },

  onShowQuestion() {
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

    this.listenTo(HostActions.createGame.failed, this._onError);
    this.listenTo(HostActions.requestNewRound.failed, this._onError);
    this.listenTo(HostActions.startGame.failed, this._onError);
    this.listenTo(HostActions.endRound.failed, this._onError);
    this.listenTo(ClientActions.leaveGame.completed, this.onPlayerLeftGame);
  },

});

module.exports = HostStore;