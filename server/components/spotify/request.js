
// Ideas:
// * Cache playlist results, no need to request each time.

import _ from 'lodash';
import config from '../../config/environment';
import client from './api-client';
import playlists from './data/playlists';
import Track from './Track';
import checkConnectivity from '../checkConnectivity';

const playlist = playlists.top100Tracks();
const options = {
  country: 'SE',
  limit: 100,
  offset: 0,
};
let isConnected = true;

let getPlaylistTracks = (playlist) => {
  return client.getPlaylist(playlist.owner, playlist.id, options);
};

let extractTracks = (data) => {
  return data.body.tracks.items.map( data => {
    return new Track(data.track);
  });
};

let getRandomTrack = (data) => {
  let tracks = extractTracks(data);
  return _.sample(tracks);
};

let getRelatedArtists = (track) => {
  if (isConnected) {
    return client.getArtistRelatedArtists(track.artist.id).
      then(data => {
        track.setRelatedArtists(_.pluck(data.body.artists, 'name'));
        return track;
      });
  } else {
    track.setRelatedArtists(['Ozzy, Elvis', 'Madonna', 'Slayer']);
    return track;
  }
};

// let extractCovers = data => {
//   return data.body.tracks.items.map(e => {
//     return {
//       id: e.track.id,
//       url: e.track.album.images[1].url
//     };
//   });
// };

module.exports = {
  getTrack(clb) {
    return checkConnectivity()
      .then(connected => {
        isConnected = connected;
        if (config.env === 'production' || isConnected) {
          return getPlaylistTracks(playlist);
        } else {
          return require('./data/offline_fixture');
        }
      })
      // .then(function (data) {
      //   console.log(JSON.stringify(data, null, 4));
      //   return data;
      // })
      .then(getRandomTrack)
      .then(getRelatedArtists);
      // .then(data => { return clb(null, data); })
      // .catch((err) => {
      //   return clb(err);
      // });
  },
  getCovers(clb) {
    return getPlaylistTracks(playlist)
      .then(extractCovers);
  }
};
