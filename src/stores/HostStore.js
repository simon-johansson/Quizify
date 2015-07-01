'use strict';

var Reflux = require('reflux');
var HostActions = require('../actions/HostActionCreators');
var PlayerActions = require('../actions/PlayerActionCreators');

var HostStore = Reflux.createStore({
  listenables: [HostActions, PlayerActions],

  setInitialState() {
    this.state = {
      lobbyId: null,
      players: []
    };
  },

  getPlayers() {
    return this.state.players;
  },

  getLobbyId() {
    return this.state.lobbyId;
  },

  onLobbyCreated(data) {
    var {state} = this;
    state.lobbyId = data.lobbyId;
    this.trigger(state);
  },

  onPLayerJoined(data) {
    let {state} = this;
    let {playerId, playerName} = data
    state.players.push({
      playerId, playerName
    });
    this.trigger(state);
  },

  // Maybe a good idea to move all the errors out to
  // a seperate store?
  onError(err) {
    alert(err);
  },

  init() {
    this.setInitialState();

    this.listenTo(HostActions.createLobby.completed, this.onLobbyCreated);
    this.listenTo(HostActions.createLobby.failed, this.onError);
    this.listenTo(PlayerActions.joinLobby.completed, this.onPLayerJoined);
  },

});

module.exports = HostStore;
