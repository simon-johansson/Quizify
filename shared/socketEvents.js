
var socketEvents = {
  toServer: {
    fromClient: {
      leaveGame: 'client:leaveGame',
    },
    fromHost: {
      createGame: 'host:createGame',
      listPlayers: 'host:listPlayers',
      requestNewRound: 'host:requestNewRound'
    },
    fromPlayer: {
      joinGame: 'player:joinGame',
    },
  },
  fromServer: {
    toClient: {
      leaveGame: 'server:leaveGame',
      newRound: 'server:newRound'
    },
    toHost: {
      gameCreated: 'server:createGame',
      playerJoined: 'server:playerJoined',
    },
    toPlayer: {
      joinedGame: 'server:joinedGame',
      listPlayers: 'server:listPlayers'
    }
  }
};

module.exports = socketEvents;
