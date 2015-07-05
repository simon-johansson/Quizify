
var socketEvents = {
  client : {
    host: {
      createLobby: 'host:create lobby'
    },
    player: {
      joinLobby: 'player:join lobby',
    },
  },
  server : {
    lobbyCreated: 'server:lobby created',
    playerJoined: 'server:lobby joined',
    clientDisconnected: 'server:client disconnected',
  }
};

module.exports = socketEvents;
