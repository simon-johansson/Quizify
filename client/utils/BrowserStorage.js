'use strict';

let store = require('store');
const storageKey = 'spotifyquiz';

var generateStorageKey = (key) => {
  return `${storageKey}-${key}`;
};

var get = (key) => {
  return store.get(generateStorageKey(key));
};

var set = (key, value) => {
  return store.set(generateStorageKey(key), value);
};

module.exports = {
  getPlayerName() {
    return get('playerName');
  },

  setPlayerName(name) {
    return set('playerName', name);
  }
};
