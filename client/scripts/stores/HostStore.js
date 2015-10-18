
import {find} from 'lodash';
import Reflux from 'reflux';

import ClientActions from 'actions/ClientActionCreators';
import HostActions from 'actions/HostActionCreators';
import PlayerActions from 'actions/PlayerActionCreators';
import Round from 'utils/models/Round';
import {augmentWithStateGetters} from './utils';

const createDeepLink = (url, id) => `${url}/#/player/${id}`;

const HostStore = Reflux.createStore({
  listenables: [HostActions, ClientActions],

  setInitialState() {
    this.state = {
      url: '',
      deepLink: '',
      gameId: null,
      players: [],
      countdown: 10,
      rounds: [],
      currentRound: new Round(),
      roundsPlayed: 0,
      totalNumberOfRounds: 3,
      gameOver: false,
    };

    augmentWithStateGetters(this);
  },

  getState() { return this.state; },

  onCreateGameCompleted(data) {
    let {state} = this;
    state.gameId = data.gameId;
    state.url = data.url;
    state.deepLink = createDeepLink(data.url, data.gameId);
    this.trigger(state);
  },

  onPlayerJoined(data) {
    const {state} = this;
    const {clientId, playerName} = data;
    const points = 0;
    state.players.push({clientId, playerName, points});
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
    state.currentRound.answers.forEach(answer => {
      let {clientId} = answer;
      let player = find(state.players, {clientId});
      // console.log(answer);
      if (answer.answer === state.currentRound.track.artist.name ||
          answer.answer === 'right') {
        player.points += answer.points;
      }
    });
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

  endGame() {
    let {state} = this;
    state.rounds = [];
    state.currentRound = new Round();
    state.roundsPlayed = 0;
    state.gameOver = true;
    this.trigger(state);
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
