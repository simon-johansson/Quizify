
const _ = require('lodash');
const HostActions = require('actions/HostActionCreators');
const ClientActions = require('actions/ClientActionCreators');
const PlayerActions = require('actions/PlayerActionCreators');
const HostStore = require('stores/HostStore');
const PlayerStore = require('stores/PlayerStore');
let names = ['Bret', 'Antonette', 'Samantha', 'Karianne', 'Kamren', 'Leopoldo',
             'Elwyn', 'Maxime', 'Delphine', 'Moriah'];

class Player {
  constructor(playerName) {
    this.playerName = playerName ||
                      names.splice(_.random(0, (names.length - 1)), 1)[0];
    this.clientId = `${Math.floor(Math.random() * 100000)}`;
    this.gameId = '1234';
  }
}

// --------------
// Host helpers
// --------------
window.addPlayers = (num) => {
  let times = typeof num === 'number' ? num : 1;
  for (let i = 0; i < times; i++) {
    HostActions.playerJoined(new Player());
  }
};

window.removePlayer = () => {
  let player = _.sample(HostStore.getPlayers());
  names.push(player.playerName);
  ClientActions.leaveGame.completed({clientId: player.clientId});
};

window.giveRightAnswer = (id) => {
  HostActions.answer({
    clientId: id,
    answer: 'right',
    timestamp: new Date()
  });
};

window.giveWrongAnswer = (id) => {
  HostActions.answer({
    clientId: id,
    answer: 'wrong',
    timestamp: new Date()
  });
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
  PlayerActions.startGame();
};

window.newRound = () => {
  PlayerActions.newRound({
    alternatives: [ 'Adam Lambert', 'Rabbii', 'The Knife', 'Gorillaz' ]
  });
};

window.answerReceivedPlayer = () => {
  PlayerActions.answerReceived({
    points: Math.floor(Math.random(20)*100)
  });
};

window.endRoundPlayer = () => {
  PlayerActions.endRound({
    correct: (Math.random() > 0.5) ? true : false
  });
};

window.endGamePlayer = () => {
  PlayerActions.endGame();
};
