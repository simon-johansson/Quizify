
import io from 'socket.io-client';

import clientEvents from './clientEvents';
import hostEvents from './hostEvents';
import playerEvents from './playerEvents';

let socket = io();

export default {
  setSocketInstance(newSocket){
    socket = newSocket;
  },

  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
  },

  bindClientEvents: () => clientEvents.bind(socket),

  bindHostEvents: () => hostEvents.bind(socket),
  unbindHostEvents: () => hostEvents.unbind(socket),

  bindPlayerEvents: () => playerEvents.bind(socket),
  unbindPlayerEvents: () => playerEvents.unbind(socket),
};


