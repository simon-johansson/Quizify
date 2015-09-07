'use strict';

const PlayerStore = require('stores/PlayerStore');
const PlayerActions = require('actions/PlayerActionCreators');
const ClientActions = require('actions/ClientActionCreators');

describe('PlayerStore', () => {

  it('should be defined', () => {
    expect(PlayerStore).to.exist;
  });

  it('should be able to get player id', () => {
    expect(PlayerStore.getPlayerId).to.a('function');
  });

  it('should be able to get player name', () => {
    expect(PlayerStore.getPlayerName).to.a('function');
  });

  it('should be able to get lobby id', () => {
    expect(PlayerStore.getGameId).to.a('function');
  });

  describe('Joining lobby', () => {
    var sandbox;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        sandbox.spy(window, "alert");
      });

      afterEach(() => {
        sandbox.restore();
      });

    it('should set gameId, playerId and playerName when joining lobby', (done) => {
      PlayerActions.joinGame.completed({
        gameId: '123',
        playerId: 'abc',
        playerName: 'James'
      });

      setTimeout( () => {
        expect(PlayerStore.getGameId()).to.eql('123');
        expect(PlayerStore.getPlayerId()).to.eql('abc');
        expect(PlayerStore.getPlayerName()).to.eql('James');
        done()
      }, 0);
    });

    it('should alert the user if lobby could not be joined', (done) => {
      PlayerActions.joinGame.failed('Error!');

      setTimeout( () => {
        expect(window.alert).to.have.been.calledOnce;
        expect(window.alert).to.have.been.calledWith("Error!");
        done()
      }, 0);
    });

    it('should set latency upon reciving new latency data', (done) => {
      ClientActions.latency(432);

      setTimeout( () => {
        expect(PlayerStore.getLatency()).to.eql(432);
        done()
      }, 0);
    });

    it('should update player array when new player enters game', (done) => {
      let players = [{name: 'Simon'}, {name: 'David'}];
      PlayerActions.listPlayers({players});

      setTimeout( () => {
        expect(PlayerStore.getPlayers()).to.eql(players);
        done()
      }, 0);
    });
  });
});
