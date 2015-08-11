'use strict';

// Ideas:
// * Cache playlist results, no need to request each time.

var _ = require('lodash');
var client = require('./api-client');
var playlist = require('./data/playlists').top100Tracks();
var Track = require('./Track');

let options = {
  country: 'SE',
  limit: 100,
  offset: 0,
};

let getPlaylistTracks = (playlist) => {
  return client.getPlaylist(playlist.owner, playlist.id, options);
}

let extractTracks = (data) => {
  return data.body.tracks.items.map( data => {
    return new Track(data.track);
  });
}

let getRandomTrack = (data) => {
  let tracks = extractTracks(data);
  return _.sample(tracks);
}

let getRelatedArtists = (track) => {
  return client.getArtistRelatedArtists(track.artist.id).
    then(data => {
      track.setRelatedArtists(_.pluck(data.body.artists, 'name'));
      return track;
    });
}

module.exports = {
  getTrack(clb) {
    return getPlaylistTracks(playlist)
      .then(getRandomTrack)
      .then(getRelatedArtists)
      .then(data => { return clb(data); })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }
}
