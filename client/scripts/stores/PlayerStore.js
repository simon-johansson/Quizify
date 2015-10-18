
import Reflux from 'reflux';
import MobileDetect from 'mobile-detect';
const md = new MobileDetect(window.navigator.userAgent);

import ClientActions from '../actions/ClientActionCreators';
import PlayerActions from '../actions/PlayerActionCreators';
import browserStorage from '../utils/BrowserStorage';
import {augmentWithStateGetters} from './utils';

const PlayerStore = Reflux.createStore({
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
      round: {
        alternatives: null,
        points: null,
        correct: null,
        hasEnded: null
      },
      game: {
        points: 0,
        hasEnded: null
      }
    };
    augmentWithStateGetters(this);
  },

  getState(){ return this.state; },

  _onLatency(data) {
    const {state} = this;
    state.latency = data;
    this.trigger(state, 'latency');
  },

  onJoinGameCompleted(data) {
    const {state} = this;
    state.gameId = data.gameId;
    state.playerId = data.playerId;
    state.joindGame = true;
    if(state.playerName !== data.playerName) {
      state.playerName = data.playerName;
      browserStorage.setPlayerName(data.playerName);
    }
    this.trigger(state);
  },

  onListPlayers(data) {
    const {state} = this;
    state.players = data.players;
    this.trigger(state);
  },

  onStartGame(data) {
    this.trigger(this.state, 'startGame');
    this.state.game.points = 0;
    this.state.game.hasEnded = false;
  },

  onNewRound(data) {
    const { state } = this;
    state.round.alternatives = data.alternatives.sort(() => {
      return 0.5 - Math.random();
    });
    state.round.points = null;
    state.round.correct = null;
    this.trigger(this.state, 'newRound');
  },

  onAnswerReceived(data) {
    const { state } = this;
    state.round.points = data.points;
    this.trigger(this.state, 'answerReceived');
  },

  onEndRound(data) {
    const { state } = this;
    state.round.correct = data.correct;

    if (state.round.correct) {
      state.game.points += state.round.points;
    }

    state.round.alternatives = null;

    this.trigger(this.state, 'endRound');
  },

  onEndGame(data) {
    this.state.game.hasEnded = true;
    this.trigger(this.state);
  },

  _onError(err) {
    window.alert(err);
  },

  init() {
    this.setInitialState();

    this.listenTo(ClientActions.latency, this._onLatency);
    this.listenTo(PlayerActions.joinGame.failed, this._onError);
  },

});

export default PlayerStore;
