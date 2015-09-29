
import nop from 'nop';
import events from '../../../../shared/socketEvents';
import config from '../../../config/environment';
import {
  leaveRoom,
  emit,
  roomExists,
  createErrorObject,
} from '../utils';

export default {
  leaveGame(callback = nop) {
    const ev = events.fromServer.toClient.leaveGame;
    const {gameId, clientId: id} = this;
    if(roomExists(gameId)) {
      if(!this.disconnected) {
        leaveRoom.call(this, gameId);
      }
      // console.log(`Client (${id}) disconnected from game: ${gameId}`);
      emit(gameId, ev, {clientId});
    }
  },

  ping(callback = nop) {
    setTimeout(() => {
      callback();
    }, 300);
  }
};

// socket.on('disconnect', onClientLeave);
