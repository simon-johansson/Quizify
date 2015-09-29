
import socketIO from 'socket.io';
let instance;

export default {
  setServer(server) {
    instance = socketIO(server);
  },
  get io() {
    return instance;
  },
};
