
import nop from 'nop';
import {forOwn} from 'lodash';
import ev from '../../../shared/socketEvents';
import {setServer, io} from './instance';
import hostHandlers from './handlers/host';
import playerHandlers from './handlers/player';
import clientHandlers from './handlers/client';

const handlerExists = (handler) => {
  if(typeof handler !== 'function') {
    throw Error(`${key} does not exist`);
    return false;
  } else {
    return true;
  }
};

const connectToHandler = (socket, events, handlers) => {
  forOwn(events, (value, key) => {
    const handler = handlers[key];
    if(handlerExists(handler)) {
      socket.on(value, handler);
    }
  });
};

function bindEvents(socket) {
  let {
    fromHost: hostEvents,
    fromPlayer: playerEvents,
    fromClient: clientEvents
  } = ev.toServer;

  connectToHandler(socket, hostEvents, hostHandlers);
  connectToHandler(socket, playerEvents, playerHandlers);
  connectToHandler(socket, clientEvents, clientHandlers);
}

export default {
  init(server) {
    setServer(server);
    io.on('connection', (socket) => {
      bindEvents(socket);
    });
  },
};
