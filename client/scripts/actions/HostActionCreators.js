
import Reflux from 'reflux';

const HostActionCreators = Reflux.createActions({
  // called by button in Home compenent
  createGame: {
    children: ['completed', 'failed']
  },
  startGame: {
    children: ['completed', 'failed']
  },
  endRound: {
    children: ['completed', 'failed']
  }
});

HostActionCreators.listPlayers = Reflux.createAction();
HostActionCreators.playerJoined = Reflux.createAction();
HostActionCreators.prepareNewRound = Reflux.createAction();
HostActionCreators.newRound = Reflux.createAction();
HostActionCreators.answer = Reflux.createAction();
HostActionCreators.answerReceived = Reflux.createAction();
HostActionCreators.decrementPoints = Reflux.createAction();

export default HostActionCreators;
