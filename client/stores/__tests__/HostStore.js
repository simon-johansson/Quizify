'use strict';

describe('HostStore', () => {
  var HostStore, HostActions, sandbox;

  beforeEach( () => {
    HostStore = require('stores/HostStore');
    HostActions = require('actions/HostActionCreators');
  });

  it('should be defined', () => {
    expect(HostStore).to.exist;
  });

  it('should be able to get array of players', () => {
    let players = HostStore.getPlayers();
    expect(players).to.be.an("array");
    expect(players).to.be.empty;
  });

  it('should be able to get game id', () => {
    let id = HostStore.getGameId();
    expect(id).to.eql(null);
  });

  it('should set gameId when game has been created', (done) => {
    HostActions.createGame.completed({gameId: 123});

    setTimeout( () => {
      expect(HostStore.getGameId()).to.eql(123);
      done()
    }, 200);
  });
});
