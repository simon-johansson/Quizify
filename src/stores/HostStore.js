'use strict';

var socket = require('../utils/socket');
var socketEvents = require('../../common/socketEvents');

var Reflux = require('reflux');
var Actions = require('../actions/HostActionCreators');

var HostStore = Reflux.createStore({
  listenables: Actions,

  setInitialState() {
    this.state = {
      lobbyId: 'null',
      users: []
    };
  },

  onCreateLobby(data) {
    socket.emit(socketEvents.client.host.createLobby);
  },

  init() {
    this.setInitialState();

    socket.on(socketEvents.server.lobbyCreated, (data) => {
      var {state} = this;
      state.lobbyId = data.lobbyId;
      this.trigger(state);
    });
  },

});

module.exports = HostStore;
