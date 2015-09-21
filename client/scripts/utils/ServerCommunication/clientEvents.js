
import {merge} from 'lodash';
import nop from 'nop';
import events from 'shared/socketEvents';
import ClientActions from 'actions/ClientActionCreators';
import {wrapper} from './utils';

const bouncingListeners = [];
const outgoingListeners = ['leaveGame'];
const incomingListeners = ['leaveGame'];

const bouncing = (socket) => {
  let ev = events.toServer.fromClient;

  setInterval(() => {
    let startTime = Date.now();
    socket.emit(ev.ping, () => {
      let latency = Date.now() - startTime;
      ClientActions.latency(latency);
    });
  }, 2000);
};

const outgoing = (socket) => {
  let ev = events.toServer.fromClient;

  outgoingListeners.forEach(listener => {
    ClientActions[listener].listen(data => {
      // console.log('emitting ', listener, data);
      socket.emit(ev[listener], data);
    });
  });
};

const incoming = (socket) => {
  let ev = events.fromServer.toClient;

  incomingListeners.forEach(listener => {
    socket.on(ev[listener], data => wrapper(ClientActions[listener], data));
  });
};

module.exports = {
  bind(socket) {
    [bouncing, outgoing, incoming].forEach(fn => fn(socket));
  },
  unbind() {}
};
