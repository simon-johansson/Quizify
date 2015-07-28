'use strict';

var Reflux = require('reflux');
var service = require('../utils/WebSocketService');

var ClientActionCreators  =  Reflux.createActions({
  "leaveGame": {
    children: ["completed", "failed"]
  },
});

module.exports = ClientActionCreators;
