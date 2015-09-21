
export default {
  toServer: {
    fromClient: {
      leaveGame: 'client:leaveGame',
      ping: 'client:ping',
    },
    fromHost: {
      createGame: 'host:createGame',
      listPlayers: 'host:listPlayers',
      startGame: 'host:startGame',
      newRound: 'host:newRound',
      answerReceived: 'host:answerReceived',
      endRound: 'host:endRound',
    },
    fromPlayer: {
      joinGame: 'player:joinGame',
      answer: 'player:answer',
    },
  },
  fromServer: {
    toClient: {
      leaveGame: 'server:leaveGame',
    },
    toHost: {
      playerJoined: 'server:playerJoined',
      answer: 'server:answer',
    },
    toPlayer: {
      listPlayers: 'server:listPlayers',
      newRound: 'server:newRound',
      startGame: 'server:startGame',
      answerReceived: 'server:answerReceived',
      endRound: 'server:roundEnded',
    }
  }
};
