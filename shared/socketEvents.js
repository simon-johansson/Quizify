
var socketEvents = {
  toServer: {
    fromClient: {
      leaveGame: 'client:leaveGame',
    },
    fromHost: {
      createGame: 'host:createGame',
      listPlayers: 'host:list:players'
    },
    fromPlayer: {
      joinGame: 'player:joinGame',
    },
  },
  fromServer: {
    toClient: {
      leaveGame: 'server:leaveGame',
    },
    toHost: {
      gameCreated: 'server:createGame',
      playerJoined: 'server:playerJoined',
    },
    toPlayer: {
      joinGame: 'server:joinGame',
      listPlayers: 'server:listPlayers'
    }
  }
};

module.exports = socketEvents;
