'use strict';

require("babel/register");

var path = require('path');

var express = require('express');
var config = require('./server/config/environment/');

var app = express();
var server = require('http').Server(app);
var socket = require('./server/components/socket').init(server);

require('./server/config/express')(app);

server.listen(config.port, function () {
  console.log('Server running on port ' + config.port);
});

