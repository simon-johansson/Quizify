
var socketEvents = {
  client : {
    leaveGame: 'client:leaveGame',
    host: {
      createGame: 'host:createGame',
      listPlayers: 'host:list:players'
    },
    player: {
      joinGame: 'player:joinGame',
    },
  },
  server : {
    gameCreated: 'server:gameCreated',
    playerJoined: 'server:gameJoined',
    clientLeft: 'server:clientLeft',
    listPlayers: 'server:list:players'
  }
};

module.exports = socketEvents;
