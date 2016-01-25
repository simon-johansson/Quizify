
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
    emit.call(this, gameId, ev, data);
  },

  startGame(data, callback = nop) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.startGame;
    fetchTrack.call(this, gameId, ev, callback);
  },

  newRound(data) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.newRound;
    emit.call(this, gameId, ev, data);
  },

  answerReceived(data) {
    const {playerId, points} = data;
    const ev = events.fromServer.toPlayer.answerReceived;
    emit.call(this, playerId, ev, {points: points});
  },

  endRound(data, callback = nop) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.endRound;
    fetchTrack.call(this, gameId, ev, callback);
  },

  endGame(data, callback = nop) {
    const {gameId} = this;
    const ev = events.fromServer.toPlayer.endGame;
    emit.call(this, gameId, ev, data);
  }
};
