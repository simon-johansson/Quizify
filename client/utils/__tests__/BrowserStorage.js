'use strict';

const BrowserStorage = require('../BrowserStorage');

describe('BrowserStorage', () => {

  const storageKey = 'spotifyquiz';

  describe('#getPlayerName', () => {

    it('should be a function', () => {
      expect(BrowserStorage.getPlayerName).to.exist;
      expect(BrowserStorage.getPlayerName).to.be.a('function');
    });

    it('should be able to get player name', () => {
      expect(BrowserStorage.getPlayerName()).to.be.a('string');
    });
  });

  describe('#setPlayerName', () => {

    it('should be a function', () => {
      expect(BrowserStorage.setPlayerName).to.exist;
      expect(BrowserStorage.setPlayerName).to.be.a('function');
    });

    it('should be able to set player name', () => {
      BrowserStorage.setPlayerName('Sam');
      expect(BrowserStorage.getPlayerName()).to.eql('Sam');
    });

    it('should be able to set player name multiple times', () => {
      BrowserStorage.setPlayerName('Ozzy');
      expect(BrowserStorage.getPlayerName()).to.eql('Ozzy');
      BrowserStorage.setPlayerName('Elvis');
      expect(BrowserStorage.getPlayerName()).to.eql('Elvis');
    });

    it('should use storage key when storing in localstorage', () => {
      BrowserStorage.setPlayerName('Lady Gaga');
      expect(window.localStorage.getItem(`${storageKey}-playerName`)).to.eql('"Lady Gaga"');
    });

    it('should be able to set player name with other data already in local storage', () => {
      localStorage.setItem('name', 'Mr. Bob');
      BrowserStorage.setPlayerName('Tom Jones');
      expect(localStorage.getItem('name')).to.eql('Mr. Bob');
      expect(BrowserStorage.getPlayerName()).to.eql('Tom Jones');
    });
  });
});
