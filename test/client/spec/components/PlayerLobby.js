'use strict';

describe('PlayerLobby', function () {
  var React = require('react/addons');
  var PlayerLobby, component;

  beforeEach(function () {
    PlayerLobby = require('components/PlayerLobby.js');
    component = React.createElement(PlayerLobby);
  });

  it('should create a new instance of PlayerLobby', function () {
    expect(component).toBeDefined();
  });
});
