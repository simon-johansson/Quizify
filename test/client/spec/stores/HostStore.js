'use strict';

describe('HostStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/HostStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
