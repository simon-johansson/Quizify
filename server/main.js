'use strict';

require('babel/register');

var server = require('./server');
var config = require('./config/environment/');

require('./components/socket').init(server);

server.listen(config.port, function () {
  console.log('Server running on port ' + config.port);
});
