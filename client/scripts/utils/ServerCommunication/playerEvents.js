
import {merge} from 'lodash';
import events from 'shared/socketEvents';
import actions from 'actions/PlayerActionCreators';
import {
  bindBouncingListeners,
  bindOutgoingListeners,
  bindIncomingListeners,
  unbindRefluxActions,
  unbindSocketEvents
} from './utils';

const bouncingListeners = ['joinGame'];
const outgoingListeners = ['answer'];
const incomingListeners = ['startGame', 'newRound', 'listPlayers',
  'answerReceived', 'endRound', 'endGame'];

const bouncing = (socket) => {
  const ev = events.toServer.fromPlayer;
  bindBouncingListeners(socket, bouncingListeners, actions, ev);
};

const outgoing = (socket) => {
  const ev = events.toServer.fromPlayer;
  bindOutgoingListeners(socket, outgoingListeners, actions, ev);
};

const incoming = (socket) => {
  const ev = events.fromServer.toPlayer;
  bindIncomingListeners(socket, incomingListeners, actions, ev);
};

export default {
  bind(socket) {
    [bouncing, outgoing, incoming].forEach(fn => fn(socket));
  },

  unbind(socket) {
    const actionListeners = merge(bouncingListeners, outgoingListeners);
    unbindRefluxActions(actionListeners, actions);

    const ev = events.fromServer.toPlayer;
    unbindSocketEvents(socket, incomingListeners, ev);
  }
};
