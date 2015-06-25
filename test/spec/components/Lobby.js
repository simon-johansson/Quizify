'use strict';

describe('Lobby', function () {
  var React = require('react/addons');
  var Lobby, component;

  beforeEach(function () {
    Lobby = require('components/Lobby.js');
    component = React.createElement(Lobby);
  });

  it('should create a new instance of Lobby', function () {
    expect(component).toBeDefined();
  });
});
