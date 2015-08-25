
var socketEvents = {
  toServer: {
    fromClient: {
      leaveGame: 'client:leaveGame',
      ping: 'client:ping',
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
      playerJoined: 'server:playerJoined',
    },
    toPlayer: {
      listPlayers: 'server:listPlayers'
    }
  }
};

module.exports = socketEvents;
