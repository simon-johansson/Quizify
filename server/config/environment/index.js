
import {normalize} from 'path';
import {merge} from 'lodash';
const {NODE_ENV, PORT} = process.env;
let env;

const all = {
  env: NODE_ENV || 'development',
  root: normalize(__dirname + '/../../..'),
  port: PORT || 9000,
  spotifyTokenRefreshRate: 3600000 // one hour
};

try {
  env = require(`./${all.env}.js`);
} catch (err) {
  env = {};
}

export default merge(all, env);
