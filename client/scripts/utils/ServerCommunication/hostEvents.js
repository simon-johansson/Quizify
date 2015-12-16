
import {merge} from 'lodash';
import events from 'shared/socketEvents';
import actions from 'actions/HostActionCreators';
import {
  bindBouncingListeners,
  bindOutgoingListeners,
  bindIncomingListeners,
  unbindRefluxActions,
  unbindSocketEvents
} from './utils';

const bouncingListeners = ['createGame', 'startGame', 'endRound'];
const outgoingListeners = ['listPlayers','newRound','answerReceived','endGame'];
const incomingListeners = ['answer', 'playerJoined'];

const bouncing = (socket) => {
  const ev = events.toServer.fromHost;
  bindBouncingListeners(socket, bouncingListeners, actions, ev);
};

const outgoing = (socket) => {
  const ev = events.toServer.fromHost;
  bindOutgoingListeners(socket, outgoingListeners, actions, ev);
};

const incoming = (socket) => {
  const ev = events.fromServer.toHost;
  bindIncomingListeners(socket, incomingListeners, actions, ev);
};

export default {
  bind(socket) {
    [bouncing, outgoing, incoming].forEach(fn => fn(socket));
  },

  unbind(socket) {
    const actionListeners = merge(bouncingListeners, outgoingListeners);
    unbindRefluxActions(actionListeners, actions);

    const ev = events.fromServer.toHost;
    unbindSocketEvents(socket, incomingListeners, ev);
  }
};
