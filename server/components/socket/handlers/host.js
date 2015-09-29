
import nop from 'nop';
import events from '../../../../shared/socketEvents';
import config from '../../../config/environment';
import {
  joinRoom,
  emit,
  fetchTrack,
  generateGameId,
} from '../utils';

export default {
  createGame(data, callback = nop) {
    const gameId = generateGameId();
    // if(io.nsps['/'].adapter.rooms[gameId]) {
    //   return onHostCreateGame();
    // }
    joinRoom.call(this, gameId);

    callback({
      gameId,
      url: config.url
    });
  },

  listPlayers(data) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.listPlayers;
    emit(gameId, ev, data);
  },

  startGame(data, callback = nop) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.startGame;
    fetchTrack(gameId, ev, callback);
  },

  newRound(data) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.newRound;
    emit(gameId, ev, data);
  },

  answerReceived(data) {
    const {playerId} = data;
    const ev = events.fromServer.toPlayer.answerReceived;
    emit(playerId, ev, {points: 300});
  },

  endRound(data, callback = nop) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.endRound;
    fetchTrack(gameId, ev, callback);
  }
};
