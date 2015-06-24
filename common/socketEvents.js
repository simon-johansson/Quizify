
var socketEvents = {
  client : {
    host: {
      createLobby: 'host:create lobby'
    },
    player: {},
  },
  server : {
    lobbyCreated: 'server:lobby created'
  }
};

module.exports = socketEvents;
