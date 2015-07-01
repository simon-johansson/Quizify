'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/HostActionCreators');

var HostStore = Reflux.createStore({
  listenables: Actions,

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

  // Maybe a good idea to move all the errors out to
  // a seperate store?
  onError(err) {
    alert(err);
  },

  init() {
    this.setInitialState();

    socket.on(socketEvents.server.userJoined, (data) => {
      var {state} = this;
      state.users.push({
        playerId: data.playerId,
        playerName: data.playerName
      });
      this.trigger(state);
    });

    this.listenTo(Actions.createLobby.completed, this.onLobbyCreated);
    this.listenTo(Actions.createLobby.failed, this.onError);
  },

});

module.exports = HostStore;
