'use strict';

let ip = require('my-local-ip');

module.exports = {
  url: `http://${ip()}:${process.env.PORT || 9000}`
};
