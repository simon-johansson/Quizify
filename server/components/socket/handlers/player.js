
import nop from 'nop';
import events from '../../../../shared/socketEvents';
import config from '../../../config/environment';
import {
  joinRoom,
  emit,
  roomExists,
  createErrorObject,
} from '../utils';

export default {
  joinGame(data, callback = nop) {
    const {gameId, playerName} = data;
    const playerId = this.id;
    const ev = events.fromServer.toHost.playerJoined;
    let payload;
    if(roomExists(gameId)) {
      joinRoom.call(this, gameId);
      // console.log(`New player (${playerName}) joined game: ${gameId}`);
      payload = {playerName, playerId};
      emit.call(this, gameId, ev, payload);
    } else {
      payload = createErrorObject(`Game ${gameId} does not exist`);
      // console.log(`Error: Player attempted to join room (${errorMessage}) that could not be found`);
    }
    callback(payload);
  },

  answer(data) {
    const {gameId} = this;
    const ev = events.fromServer.toHost.answer;
    emit.call(this, gameId, ev, data);
  }
};
