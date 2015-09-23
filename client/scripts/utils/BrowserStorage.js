
import store from 'store';
const storageKey = 'a-unique-identifier';

const generateStorageKey = (key) => {
  return `${storageKey}-${key}`;
};

const get = (key) => {
  return store.get(generateStorageKey(key)) || '';
};

const set = (key, value) => {
  return store.set(generateStorageKey(key), value);
};

export default {
  getPlayerName() {
    return get('playerName');
  },

  setPlayerName(name) {
    return set('playerName', name);
  }
};
