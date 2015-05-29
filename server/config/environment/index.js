'use strict';

var path = require('path');
var _    = require('lodash');

var all = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,
  spotifyTokenRefreshRate: 3600000 // one hour
};

module.exports = _.merge(all, require(`./${all.env}.js`) || {});
