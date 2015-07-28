'use strict';

var PlayerStore = require('stores/PlayerStore');
var PlayerActions = require('actions/PlayerActionCreators');

describe('PlayerStore', () => {

  it('should be defined', () => {
    expect(PlayerStore).to.exist;
  });

  it('should be able to get player id', () => {
    let playerId = PlayerStore.getPlayerId();
    expect(playerId).to.eql(null);
  });

  it('should be able to get player name', () => {
    let name = PlayerStore.getPlayerName();
    expect(name).to.eql(null);
  });

  it('should be able to get lobby id', () => {
    let gameId = PlayerStore.getGameId();
    expect(gameId).to.eql(null);
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
  });
});
