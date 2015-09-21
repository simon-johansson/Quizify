
import {merge} from 'lodash';
import nop from 'nop';
import events from 'shared/socketEvents';
import HostActions from 'actions/HostActionCreators';
import {wrapper} from './utils';

const bouncingListeners = ['createGame', 'startGame', 'endRound'];
const outgoingListeners = ['listPlayers', 'newRound', 'answerReceived'];
const incomingListeners = ['answer', 'playerJoined'];

const bouncing = (socket) => {
  let ev = events.toServer.fromHost;

  bouncingListeners.forEach(listener => {
    HostActions[listener].listen((dataToServer = {}) => {
      // console.log('emitting ', listener);
      socket.emit(
        ev[listener],
        dataToServer,
        dataFromServer => wrapper(HostActions[listener], dataFromServer)
      );
    });
  });
};

const outgoing = (socket) => {
  let ev = events.toServer.fromHost;

  outgoingListeners.forEach(listener => {
    HostActions[listener].listen(data => {
      // console.log('emitting ', listener, data);
      socket.emit(ev[listener], data);
    });
  });
};

const incoming = (socket) => {
  let ev = events.fromServer.toHost;

  incomingListeners.forEach(listener => {
    socket.on(ev[listener], HostActions[listener]);
  });
};

export default {
  bind(socket) {
    [bouncing, outgoing, incoming].forEach(fn => fn(socket));
  },

  unbind(socket) {
    merge(bouncingListeners, outgoingListeners).forEach(listener => {
        HostActions[listener].listen = nop;
      });

    incomingListeners.forEach(listener => {
      socket.off(events.fromServer.toHost[listener]);
    });
  }
};
