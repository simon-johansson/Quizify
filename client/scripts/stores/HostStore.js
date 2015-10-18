
import Reflux from 'reflux';

import ClientActions from 'actions/ClientActionCreators';
import HostActions from 'actions/HostActionCreators';
import PlayerActions from 'actions/PlayerActionCreators';
import Round from 'utils/models/Round';

const createDeepLink = (url, id) => `${url}/#/player/${id}`;

const HostStore = Reflux.createStore({
  listenables: [HostActions, PlayerActions, ClientActions],

  setInitialState() {
    this.state = {
      url: '',
      deepLink: '',
      gameId: null,
      players: [],
      countdown: 10,
      rounds: [],
      currentRound: new Round(),
      roundsPlayed: 0
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
    let {state} = this;
    state.gameId = data.gameId;
    state.url = data.url;
    state.deepLink = createDeepLink(data.url, data.gameId);
    this.trigger(state);
  },

  onPlayerJoined(data) {
    const {state} = this;
    const {playerId, playerName} = data;
    const points = 0;
    state.players.push({playerId, playerName, points});
    this.trigger(state, 'playerJoinedGame');
  },

  onPlayerLeft(data) {
    let {state} = this;
    let {clientId} = data;
    state.players = state.players.filter( o => o.playerId !== clientId );
    this.trigger(state);
  },

  onStartGameCompleted(data) {
    let {state} = this;
    let round = new Round(data);
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
    let round = new Round(data);
    state.rounds.push(round);
  },

  onPrepareNewRound() {
    let {state} = this;
    state.currentRound = state.rounds[state.rounds.length - 1];
    state.currentRound.isShowing = true;
    this.trigger(state, 'newRound');
  },

  onAnswer(data) {
    let {state} = this;
    data.points = state.currentRound.points;
    state.currentRound.answers.push(data);
    this.trigger(data, 'answer');
  },

  onDecrementPoints(data) {
    let {state} = this;
    const points = 30 - Math.floor(data / 1000);
    if (state.currentRound.points !== points) {
      state.currentRound.points = points;
      this.trigger(state);
    }
  },

  // Maybe a good idea to move all the errors out to
  // a seperate store?
  onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    // this.listenTo(HostActions.createGame.failed, this._onError);
    // this.listenTo(HostActions.startGame.failed, this._onError);
    // this.listenTo(HostActions.endRound.failed, this._onError);
    this.listenTo(ClientActions.leaveGame.completed, this.onPlayerLeft);
  },

});

export default HostStore;
