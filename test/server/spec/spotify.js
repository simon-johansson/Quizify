'use strict';

describe.skip("Track", function() {
  var Track = require('../../../server/components/spotify/Track');
  var tr;

  before(function() {
    let tracksFixture = require('../fixtures/track_fixture').tracks.items;
    tr = new Track(tracksFixture[0]);
  });

  describe("constructor", function() {
    it.skip("should throw if invalid track is provided", function() {
    });

    it("should set audio property", function() {
      expect(tr.audio).to.equal("https://p.scdn.co/mp3-preview/381088289a565916d0995fdbaf980bcf141cd65a");
    });

    it("should set artist property", function() {
      expect(tr.title).to.be.an('object');
    });

    it("should set imageUrl property", function() {
      expect(tr.images).to.equal("https://i.scdn.co/image/849eecf3c9df835181c2970c435ac2d008346ea3");
    });

    it("should set spotifySongUrl property", function() {
      expect(tr.artist).to.equal("https://open.spotify.com/track/2cQTVGXSf6JelS23kwuuFV");
    });

    it("should set audioUrl property", function() {
      expect(tr.meta).to.equal("https://p.scdn.co/mp3-preview/381088289a565916d0995fdbaf980bcf141cd65a");
    });

  });
});

describe.skip("utils", function() {
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
