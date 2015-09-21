
import {merge} from 'lodash';
import nop from 'nop';
import events from 'shared/socketEvents';
import PlayerActions from 'actions/PlayerActionCreators';
import {wrapper} from './utils';

const bouncingListeners = ['joinGame'];
const outgoingListeners = [];
const incomingListeners = ['listPlayers', 'listPlayers'];

const bouncing = (socket) => {
  let ev = events.toServer.fromPlayer;

  bouncingListeners.forEach(listener => {
    PlayerActions[listener].listen(dataToServer => {
      // console.log('emitting ', listener);
      socket.emit(
        ev[listener],
        dataToServer,
        dataFromServer => wrapper(PlayerActions[listener], dataFromServer)
      );
    });
  });
};

const outgoing = (socket) => {
};

const incoming = (socket) => {
  let ev = events.fromServer.toPlayer;

  incomingListeners.forEach(listener => {
    socket.on(ev[listener], PlayerActions[listener]);
  });
};

module.exports = {
  bind(socket) {
    [bouncing, outgoing, incoming].forEach(fn => fn(socket));
  },
  unbind() {
    merge(bouncingListeners, outgoingListeners).forEach(listener => {
        PlayerActions[listener].listen = nop;
      });

    incomingListeners.forEach(listener => {
      socket.off(events.fromServer.toPlayer[listener]);
    });
  }
};
