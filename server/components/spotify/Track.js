'use strict';

var utils = require('./utils');

class Track {
  constructor(track) {
    this.audio = track.preview_url;
    this.title = track.name;

    this.image = track.album.images[1];

    this.artist = {};
    this.artist.name = track.artists[0].name;
    this.artist.id = track.artists[0].id;
    this.artist.related = [];

    this.meta = {};
    this.meta.id = track.artists[0].id;
    this.meta.httpLink = track.external_urls.spotify;
    this.meta.uriLink = track.uri;
  }

  getArtist() {
    return this.artist.name;
  }

  getRelatedArtists() {
    return this.artist.related;
  }

  setRelatedArtists(artists) {
    this.artist.related = artists;
  }
}

module.exports = Track;
