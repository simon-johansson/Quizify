'use strict';

var utils = require('./utils');

class Track {
  constructor(track) {
    this.audioUrl = track.preview_url;
    this.songTitle = track.name;
    this.imageUrl = track.album.images[0].url;
    this.spotifySongUrl = track.external_urls.spotify;
    this.artist = utils.extractArtistNames(track.artists);
    this.id = track.artists[0].id;
  }
}

module.exports = Track;
