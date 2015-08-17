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

    it("should set title property", function() {
      expect(tr.title).to.equal("The Handler");
    });

    it("should set audio property", function() {
      expect(tr.audio).to.equal("https://p.scdn.co/mp3-preview/381088289a565916d0995fdbaf980bcf141cd65a");
    });

    it("should set artist property", function() {
      expect(tr.artist).to.be.an('object');
      expect(tr.artist).to.have.property('name');
      expect(tr.artist).to.have.property('id');
      expect(tr.artist.name).to.have.eql('Muse');
      expect(tr.artist.id).to.eql('12Chz98pHFMPJEknJQMWvI');
    });

    it("should set images property", function() {
      expect(tr.images).to.be.an("array");
      expect(tr.images).to.be.length(3);
      expect(tr.images[0].url).to.eql('https://i.scdn.co/image/849eecf3c9df835181c2970c435ac2d008346ea3');
    });

    it("should set meta property", function() {
      expect(tr.meta).to.be.an('object');
      expect(tr.meta.id).to.eql('12Chz98pHFMPJEknJQMWvI');
      expect(tr.meta.httpLink).to.eql('https://open.spotify.com/track/2cQTVGXSf6JelS23kwuuFV');
      expect(tr.meta.uriLink).to.eql('spotify:track:2cQTVGXSf6JelS23kwuuFV');
    });
  });

  describe("#getArtist", function() {
    it("should return the tracks artist", function() {
      let artist = tr.getArtist();
      expect(artist).to.eql("Muse")
    });
  });

  describe("#getRelatedArtists", function() {
    it("should return array of related artists", function() {
      let artists = tr.getRelatedArtists();
      expect(artists).to.be.an("array")
    });
  });

  describe("#setRelatedArtists", function() {
    it("should be able to set array of related artists", function() {
      let artists = ['Black Sabbath', 'Metallica', 'Bruce Springsteen'];
      tr.setRelatedArtists(artists);
      expect(artists).to.deep.eql(tr.getRelatedArtists());
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
