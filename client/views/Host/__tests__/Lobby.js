'use strict';

describe('Lobby', () => {
  var React, TestUtils, Lobby, HostActions, sandbox;

  beforeEach( () => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    Lobby = require('views/Host/Lobby');
    HostActions = require('actions/HostActionCreators');

    sandbox = sinon.sandbox.create();
    sandbox.spy(HostActions, "createGame");
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should create a new instance of Lobby', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(Lobby, {}));
    expect(render).to.exist;
  });

  it('should call createLobby action when mounted', () => {
    var render = TestUtils.renderIntoDocument(React.createElement(Lobby, {}));
    expect(HostActions.createGame).to.have.been.calledOnce;
  });

});
