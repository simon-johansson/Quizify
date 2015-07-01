'use strict';

var Reflux = require('reflux');
var service = require('../utils/WebSocketService');

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update
var HostActionCreators  = Reflux.createActions({
  // called by button in Home compenent
  createLobby: {
    children: ["completed", "failed"]
  },
});

HostActionCreators.createLobby.listenAndPromise( service.createLobby );

module.exports = HostActionCreators;
