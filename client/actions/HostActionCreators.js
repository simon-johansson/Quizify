'use strict';

var Reflux = require('reflux');

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update
var HostActionCreators  = Reflux.createActions({
  // called by button in Home compenent
  createGame: {
    children: ["completed", "failed"]
  },
  requestNewRound: {
    children: ["completed", "failed"]
  },
  startGame: {
    children: ["completed", "failed"]
  },
  endRound: {
    children: ["completed", "failed"]
  }
});

HostActionCreators.listPlayers = Reflux.createAction();
HostActionCreators.playerJoinGame = Reflux.createAction();
HostActionCreators.showQuestion = Reflux.createAction();
HostActionCreators.givePoints = Reflux.createAction();

module.exports = HostActionCreators;
