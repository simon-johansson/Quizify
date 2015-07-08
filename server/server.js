'use strict';

var express = require('express');

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);

module.exports = server;
