'use strict';

const HostStore = require('stores/HostStore');
const HostActions = require('actions/HostActionCreators');
const ClientActions = require('actions/ClientActionCreators');

describe('HostStore', () => {

  const player1 = {
    playerId: 'abc123',
    playerName: 'Simon'
  };
  const player2 = {
    playerId: 'def456',
    playerName: 'James'
  };

  beforeEach( () => {
    HostStore.setInitialState();
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

  it('should set gameId, url and deeplink when game has been created', (done) => {
    HostActions.createGame.completed({
      gameId: 123,
      url: 'http://spotifyquiz.com'
    });

    setTimeout( () => {
      expect(HostStore.getGameId()).to.eql(123);
      expect(HostStore.getSiteUrl()).to.eql('http://spotifyquiz.com');
      expect(HostStore.getGameDeepLink()).to.eql('http://spotifyquiz.com/#/player/123');
      done()
    }, 10);
  });

  it('should push new player into players array upon joining the game', (done) => {
    HostActions.playerJoinedGame(player1);
    HostActions.playerJoinedGame(player2);

    setTimeout( () => {
      expect(HostStore.getPlayers()).to.be.an('array');
      expect(HostStore.getPlayers()).to.have.length(2);
      expect(HostStore.getPlayers()[0]).to.eql(player1);
      expect(HostStore.getPlayers()[1]).to.eql(player2);
      done()
    }, 10);
  });

  it('should remove player from players array upon leaving the game', (done) => {
    HostActions.playerJoinedGame(player1);
    HostActions.playerJoinedGame(player2);

    setTimeout( () => {
      expect(HostStore.getPlayers()).to.have.length(2);
      expect(HostStore.getPlayers()[0]).to.eql(player1);
      ClientActions.leaveGame.completed({
        clientId: player1.playerId
      });

        setTimeout( () => {
          expect(HostStore.getPlayers()).to.have.length(1);
          expect(HostStore.getPlayers()[0]).to.eql(player2);
          done()
        }, 10);
    }, 10);
  });

  it.skip('should increment round when new round data has been recived', () => {});
});
