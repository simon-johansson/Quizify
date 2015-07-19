
var socketEvents = {
  client : {
    host: {
      createLobby: 'host:create lobby',
      listPlayers: 'host:list:players'
    },
    player: {
      joinLobby: 'player:join lobby',
    },
  },
  server : {
    lobbyCreated: 'server:lobby created',
    playerJoined: 'server:lobby joined',
    clientDisconnected: 'server:client disconnected',
    listPlayers: 'server:list:players'
  }
};

module.exports = socketEvents;
