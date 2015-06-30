'use strict';

var Reflux = require('reflux');

var PlayerActionCreators  =  Reflux.createActions([
  "joinLobby",     // called by button in PlayerLobby compenent
]);

module.exports = PlayerActionCreators;
