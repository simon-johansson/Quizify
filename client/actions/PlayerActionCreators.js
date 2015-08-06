'use strict';

var Reflux = require('reflux');

var PlayerActionCreators  =  Reflux.createActions({
  // called by button in PlayerLobby compenent
  "joinGame": {
    children: ["completed", "failed"]
  },
});

module.exports = PlayerActionCreators;
