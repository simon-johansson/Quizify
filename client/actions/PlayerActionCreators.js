'use strict';

var Reflux = require('reflux');
var service = require('../utils/WebSocketService');

var PlayerActionCreators  =  Reflux.createActions({
  // called by button in PlayerLobby compenent
  "joinLobby": {
    children: ["completed", "failed"]
  },
});

module.exports = PlayerActionCreators;