'use strict';

const config = require('../../../server/config/environment');
const server = require(`${config.root}/server/server`);
const clientSocket = require('socket.io-client');
const serverSocket = require(`${config.root}/server/components/socket`);
const ev = require(`${config.root}/shared/socketEvents`);

require(`${config.root}/server/components/socket`).init(server);
const socketURL = `http://0.0.0.0:${config.port}`;
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe("WebSocket communication", () => {
  let host, player;

  before((done) => {
    server.listen(config.port, function () {
      done();
    });
  });

  after(() => {
    server.close();
  })

  beforeEach(() => {
    host = clientSocket.connect(socketURL, options);
    player = clientSocket.connect(socketURL, options);
  });

  afterEach(() => {
    host.disconnect();
    player.disconnect();
  });

  it('should be able to connect to server', (done) => {
    let client = clientSocket.connect(socketURL, options);

    client.on('connect', (data) => {
      done();
    });
  });

  describe("Host", () => {

    it('should be able to create lobby', (done) => {
      host.on(ev.fromServer.toHost.gameCreated, (data) => {
        expect(data).to.have.keys("gameId");
        expect(data.gameId).to.be.a("string");
        done();
      });

      host.emit(ev.toServer.fromHost.createGame);
    });

    it('should be nofified if player enters lobby', (done) => {
      let gameId;

      host.on(ev.fromServer.toHost.gameCreated, (data) => {
        gameId = data.gameId;

        host.on(ev.fromServer.toHost.playerJoined, (data) => {
          expect(Object.keys(serverSocket._getSocket().nsps['/'].adapter.rooms[gameId]).length).to.eql(2);
          expect(data).to.have.keys(['gameId', 'playerName', 'playerId']);
          expect(data.playerName).to.eql('Elivs');
          expect(data.gameId).to.eql(gameId);
          expect(data.playerId).to.be.a('string');
          done();
        });

        // 2. Player joins lobby
        player.emit(ev.toServer.fromPlayer.joinGame, {
          playerName: 'Elivs',
          gameId: gameId
        });
      });

      // 1. Hosts creates lobby
      host.emit(ev.toServer.fromHost.createGame);
    });

    it('should get notified when player leavs/disconnects', (done) => {
      let gameId, playerId, room;

      host.on(ev.fromServer.toClient.leaveGame, function (data) {
        expect(playerId).to.eql(data.clientId);
        expect(Object.keys(room).length).to.eql(1);
        done();
      });

      host.on(ev.fromServer.toHost.gameCreated, (data) => {
        gameId = data.gameId;
        room = serverSocket._getSocket().nsps['/'].adapter.rooms[gameId];
        expect(Object.keys(room).length).to.eql(1);

        host.on(ev.fromServer.toHost.playerJoined, (data) => {
          playerId = data.playerId;
          expect(Object.keys(room).length).to.eql(2);

          // 3. Player disconnects lobby
          player.disconnect()
        });

        // 2. Player joins lobby
        player.emit(ev.toServer.fromPlayer.joinGame, {
          playerName: 'Ozzy',
          gameId: gameId
        });
      });

      // 1. Hosts creates lobby
      host.emit(ev.toServer.fromHost.createGame);
    });
  });

  describe('Player', () => {

    it('should get error if trying to join lobby that does not exist', (done) => {
      player.on(ev.fromServer.toPlayer.joinedGame, (data) => {
        expect(data).to.have.keys(['errorMessage']);
        expect(data.errorMessage).to.eql('Game 123 does not exist');;
        done();
      });
      player.emit(ev.toServer.fromPlayer.joinGame, {
        playerName: 'Ozzy',
        gameId: 123
      });
    });

    it('should be able to join created lobby', (done) => {
      let gameId;

      host.on(ev.fromServer.toHost.gameCreated, (data) => {
        let gameId = data.gameId;

        player.on(ev.fromServer.toPlayer.joinedGame, (data) => {
          expect(data).to.have.keys(['gameId', 'playerName', 'playerId']);
          expect(data.playerName).to.eql('Ozzy');
          expect(data.gameId).to.eql(gameId);
          expect(data.playerId).to.be.a('string');
          done();
        });
        player.emit(ev.toServer.fromPlayer.joinGame, {
          playerName: 'Ozzy',
          gameId: gameId
        });
      });
      host.emit(ev.toServer.fromHost.createGame);
    });

    it.skip('should be nofified if host leavs/disconnects', (done) => {});
    it.skip('should not be able to enter if lobby is already full', (done) => {});
    it.skip('should get list of players when new player enters game', (done) => {});
  });
});

