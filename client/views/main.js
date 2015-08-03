'use strict';

require('utils/WebSocketService').connect();
require('fastclick').attach(document.body);
require('./routes');
