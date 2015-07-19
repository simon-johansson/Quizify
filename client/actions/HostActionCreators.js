'use strict';

var Reflux = require('reflux');
// var WebSocketService = require('../utils/WebSocketService');
// import WebSocketService from '../utils/WebSocketService';

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update
var HostActionCreators  = Reflux.createActions({
  // called by button in Home compenent
  createLobby: {
    children: ["completed", "failed"]
  },
  listPlayers: {
  	children: ["completed", "failed"]
  }
});
// var HostActionCreators  = Reflux.createActions([
//   "createLobby",
//   "lobbyCreated"
// ]);

// HostActionCreators.createLobby.listenAndPromise( service.createLobby );
// HostActionCreators.createLobby.listen(WebSocketService.createLobby);

module.exports = HostActionCreators;
