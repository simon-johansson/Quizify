
import Reflux from 'reflux';

const PlayerActionCreators  =  Reflux.createActions({
  // called by button in PlayerLobby compenent
  'joinGame': {
    children: ['completed', 'failed']
  },
});

PlayerActionCreators.listPlayers = Reflux.createAction();
PlayerActionCreators.startGame = Reflux.createAction();
PlayerActionCreators.newRound = Reflux.createAction();
PlayerActionCreators.answer = Reflux.createAction();
PlayerActionCreators.answerReceived = Reflux.createAction();
PlayerActionCreators.endRound = Reflux.createAction();
PlayerActionCreators.endGame = Reflux.createAction();

export default PlayerActionCreators;
