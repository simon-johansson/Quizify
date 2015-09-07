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
  console.log('not yet implemented');
  // ClientActions.completed.startNewRound()
};
