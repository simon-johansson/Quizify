'use strict';

require("babel/register");

var express = require('express');
var config = require('./config/environment/');

var app = express();
var server = require('http').Server(app);
var socket = require('./components/socket').init(server);

require('./config/express')(app);

server.listen(config.port, function () {
  console.log('Server running on port ' + config.port);
});

module.export = app;
