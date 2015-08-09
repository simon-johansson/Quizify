'use strict';

module.exports = {
  extractArtistNames(artists) {
      // return artists.map( artist => artist.name ).join(' & ');
      // It looks like the 'main' artist always is the first in the array
      return artists[0].name
  }
};
