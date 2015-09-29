
import {io} from './instance';
import spotify from '../spotify';

const CHECK_FOR_CLIENTS_IN_ROOM = false;

export const generateGameId = () => {
  return `${Math.floor(Math.random() * 100000)}`;
};

export const createErrorObject = (msg) => {
  const error = {};
  error.errorMessage = msg;
  return error;
};

export const emit = (id, ev, playload = {}) => {
  const fn = () => io.to(id).emit(ev, playload);

  if(CHECK_FOR_CLIENTS_IN_ROOM) {
    if(io.nsps['/'].adapter.rooms[id]) { fn(); }
  } else { fn(); }
};

export const joinRoom = function (id) {
  this.gameId = id;
  this.join(id);
};

export const leaveRoom = function (id) {
  this.gameId = null;
  this.leave(id);
};

export const fetchTrack = (id, ev, callback) => {
  spotify.getTrack().then(track => {
    emit(id, ev);
    return track;
  }, err => {
    return createErrorObject(err.message);
  }).then(data => {
    callback(data);
  });
};

export const roomExists = id => {
  const {rooms} = io.nsps['/'].adapter;
  return rooms[id] ? true : false;
};

export const numberOfClientsInRoom = id => {
  const {rooms} = io.nsps['/'].adapter;
  return rooms[id] ? Object.keys(rooms[gameId]).length : 0;
};
