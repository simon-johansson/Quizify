'use strict';

var socket = require('utils/socket');
var socketEvents = require('common/socketEvents');

describe('HostStore', () => {
  var HostStore, HostActions, sandbox;

  beforeEach( () => {
    HostStore = require('stores/HostStore');
    HostActions = require('actions/HostActionCreators');

    sandbox = sinon.sandbox.create();
    sandbox.spy(socket, "emit");
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(HostStore).to.exist;
  });

  it('should be able to get array of players', () => {
    let players = HostStore.getPlayers();
    expect(players).to.be.an("array");
    expect(players).to.be.empty;
  });

  it('should be able to get lobby id', () => {
    let id = HostStore.getLobbyId();
    expect(id).to.eql(null);
  });

  it('should emit to server upon getting the "createLobby" event', (done) => {
    HostActions.createLobby();

    setTimeout( () => {
      expect(socket.emit).to.have.been.called;
      expect(socket.emit).to.have.been.calledWith(socketEvents.client.host.createLobby);
      done()
    }, 200);
  });
});
