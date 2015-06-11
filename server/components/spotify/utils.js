'use strict';

module.exports = {
  extractArtistNames(artists) {
      return artists.map( artist => artist.name ).join(' & ');
  }
};
