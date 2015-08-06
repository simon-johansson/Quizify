'use strict';

module.exports = {
  wrapper(action, data) {
    let {failed, completed} = action;
    return data.errorMessage ? failed(data.errorMessage) : completed(data);
  }
};
