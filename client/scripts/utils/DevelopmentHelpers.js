'use strict';

const _ = require('lodash');
const HostActions = require('actions/HostActionCreators');
const ClientActions = require('actions/ClientActionCreators');
const PlayerActions = require('actions/PlayerActionCreators');
const HostStore = require('stores/HostStore');
const PlayerStore = require('stores/PlayerStore');
let names = ['Bret', 'Antonette', 'Samantha', 'Karianne', 'Kamren', 'Leopoldo', 'Elwyn', 'Maxime', 'Delphine', 'Moriah'];

class Player {
  constructor(playerName) {
    this.playerName = playerName || names.splice(_.random(0, (names.length - 1)), 1)[0];
    this.playerId = `${Math.floor(Math.random() * 100000)}`;
    this.gameId = '1234';
  }
}

// --------------
// Host helpers
// --------------
window.addPlayers = (num) => {
  let times = typeof num === 'number' ? num : 1;
  for (let i = 0; i < times; i++) {
    HostActions.playerJoinedGame(new Player());
  }
};

window.removePlayer = () => {
  let player = _.sample(HostStore.getPlayers());
  names.push(player.playerName);
  ClientActions.leaveGame.completed({clientId: player.playerId});
};

window.giveAnswer = () => {
  console.log('not yet implemented');
};

window.endRound = () => {
  HostActions.endRound();
};

// ----------------
// Player helpers
// ----------------
window.joinFakeGame = () => {
  let name = PlayerStore.getPlayerName();
  PlayerActions.joinGame.completed(new Player(name));
};

window.listPlayer = () => {
  let players = _.cloneDeep(PlayerStore.getPlayers());
  players.push(new Player());
  PlayerActions.listPlayers({players});
};

window.startGame = () => {
  PlayerActions.newRound({
    message: 'startGame'
  });
};

window.newRound = () => {
  PlayerActions.newRound({"track":{"audio":"https://p.scdn.co/mp3-preview/75b9334c1cf0da6e62a86d4d5719645d472213f2","title":"Ghost Town","images":[{"height":640,"url":"https://i.scdn.co/image/7631f246135ce27dadba72b40238855a4b323078","width":640},{"height":300,"url":"https://i.scdn.co/image/aa82e12fe28ea0602243644271309503d396ae7d","width":300},{"height":64,"url":"https://i.scdn.co/image/d5aaa9d80e249bba88a6ec7e5d5fd9f507b26d3d","width":64}],"artist":{"name":"Adam Lambert","id":"6prmLEyn4LfHlD9NnXWlf7","related":["Kelly Clarkson","Kris Allen","Blake Lewis","Katy Perry","Allison Iraheta","David Archuleta","Jordin Sparks","Ke$ha","Lady Gaga","Carly Rae Jepsen","David Cook","Elliott Yamin","Katharine McPhee","Justin Bieber","Ace Young","P!nk","Britney Spears","Maroon 5","Taylor Swift","Jason Castro"]},"meta":{"id":"6prmLEyn4LfHlD9NnXWlf7","httpLink":"https://open.spotify.com/track/44aN5xKL3kGHvQ5bXVk6B8","uriLink":"spotify:track:44aN5xKL3kGHvQ5bXVk6B8"}}});
};
