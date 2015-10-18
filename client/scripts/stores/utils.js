import _ from 'lodash';

export const augmentWithStateGetters = (store) => {
	_.each(_.keys(store.state), function (key) {
      let method = 'get' + key[0].toUpperCase() + key.substr(1);
      store[method] = function () { return store.state[key]; };
    });
};
