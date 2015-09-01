
var socketEvents = {
  toServer: {
    fromClient: {
      leaveGame: 'client:leaveGame',
      ping: 'client:ping',
    },
    fromHost: {
      createGame: 'host:createGame',
      listPlayers: 'host:listPlayers',
      requestNewRound: 'host:requestNewRound',
      startGame: 'host:startGame',
      showQuestion: 'host:showQuestion',
      givePoints: 'host:givePoints',
      endRound: 'host:endRound',
    },
    fromPlayer: {
      joinGame: 'player:joinGame',
      giveAnswer: 'player:giveAnswer',
    },
  },
  fromServer: {
    toClient: {
      leaveGame: 'server:leaveGame',
    },
    toHost: {
      playerJoined: 'server:playerJoined',
      playerAnswered: 'server:giveAnswered',
    },
    toPlayer: {
      listPlayers: 'server:listPlayers',
      newRound: 'server:newRound',
      startGame: 'server:startGame',
      showQuestion: 'server:showQuestion',
      getPoints: 'server:getPoints',
      roundEnded: 'server:roundEnded',
    }
  }
};

module.exports = socketEvents;
