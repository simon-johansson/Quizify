// 'use strict';

var express = require('express');

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);

// app.route('/*').get(function(req, res) {
//   res.redirect('/');
// });

module.exports = server;
