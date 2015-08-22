'use strict';

if(process.env.NODE_ENV === 'development') {
  require('../utils/DevelopmentHelpers');
}
require('fastclick').attach(document.body);
require('./routes');
