'use strict';

var Reflux = require('reflux');

var ClientActionCreators  =  Reflux.createActions({
  "leaveGame": {
    children: ["completed", "failed"]
  },
  "startNewRound": {
    children: ["completed", "failed"]
  },
});

module.exports = ClientActionCreators;
