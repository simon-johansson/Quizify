'use strict';

// Ideas:
// * Cache the top artist, no need to request each time.

var _ = require('lodash');
var client = require('./api-client');
var Track = require('./Track');

let playlist = {
  name: 'Top 100 tracks currently on Spotify',
  id: '4hOKQuZbraPDIfaGbM3lKI',
  owner: 'spotify'
};
let options = {
  country: 'SE',
  limit: 100,
  offset: 0,
};

let getPlaylistTracks = (playlist) => {
  return client.getPlaylist(playlist.owner, playlist.id, options);
}

let extractTracks = (data) => {
  let tracks = [];
  data.body.tracks.items.forEach( data => {
    var track = new Track(data.track);
    tracks.push(track);
  });
  return tracks;
}

let getRandomTrack = (data) => {
  let tracks = extractTracks(data);
  return _.sample(tracks);
}

let getRelatedArtists = (track) => {
  return client.getArtistRelatedArtists(track.id).
    then(data => {
      track.related = _.pluck(data.body.artists, 'name');
      return track;
    });
}

let log = (data) => {
  console.log(data);
}

setTimeout(() => {
  getPlaylistTracks(playlist)
    .then(getRandomTrack)
    .then(getRelatedArtists)
    .then(log)
    .catch((err) => {
      console.log('Error:', err.message);
    });
}, 2000);
