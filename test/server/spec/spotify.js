'use strict';

describe("Track", function() {
  var Track = require('../../../server/components/spotify/Track');
  var tr;

  before(function() {
    let tracksFixture = require('../fixtures/track_fixture').tracks.items;
    tr = new Track(tracksFixture[0]);
  });

  describe("constructor", function() {
    it.skip("should throw if invalid track is provided", function() {
    });

    it("should set songTitle property", function() {
      expect(tr.songTitle).to.equal("The Handler");
    });

    it("should set artist property", function() {
      expect(tr.artist).to.equal("Muse");
    });

    it("should set imageUrl property", function() {
      expect(tr.imageUrl).to.equal("https://i.scdn.co/image/849eecf3c9df835181c2970c435ac2d008346ea3");
    });

    it("should set spotifySongUrl property", function() {
      expect(tr.spotifySongUrl).to.equal("https://open.spotify.com/track/2cQTVGXSf6JelS23kwuuFV");
    });

    it("should set audioUrl property", function() {
      expect(tr.audioUrl).to.equal("https://p.scdn.co/mp3-preview/381088289a565916d0995fdbaf980bcf141cd65a");
    });

  });
});

describe("utils", function() {
  var utils = require('../../../server/components/spotify/utils');

  describe("#extractArtistNames", function() {
    var { extractArtistNames } = utils;

    it.skip("should throw if no target is passed in", function() {
    });

    it("should concatenate artists if multiple names are provided", function() {
      var names = extractArtistNames([
        { name: 'Ozzy' },
        { name: 'Elvis' },
        { name: 'Madonna' }
      ]);
      expect(names).to.equal("Ozzy & Elvis & Madonna");
    });
  });
});
