
import {merge} from 'lodash';
import events from 'shared/socketEvents';
import actions from 'actions/ClientActionCreators';
import {
  bindOutgoingListeners,
  bindIncomingListeners,
} from './utils';

const bouncingListeners = [];
const outgoingListeners = ['leaveGame'];
const incomingListeners = ['leaveGame'];

const bouncing = (socket) => {
  let ev = events.toServer.fromClient;

  setInterval(() => {
    let startTime = Date.now();
    socket.emit(ev.ping, () => {
      let latency = Date.now() - startTime;
      actions.latency(latency);
    });
  }, 2000);
};

const outgoing = (socket) => {
  const ev = events.toServer.fromClient;
  bindOutgoingListeners(socket, outgoingListeners, actions, ev);
};

const incoming = (socket) => {
  const ev = events.fromServer.toClient;
  bindIncomingListeners(socket, incomingListeners, actions, ev);
};

export default {
  bind(socket) {
    [bouncing, outgoing, incoming].forEach(fn => fn(socket));
  },
};
