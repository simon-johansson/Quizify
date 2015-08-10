'use strict';

var _ = require('lodash');
var request = require('./request');

class Question {
  constructor(track) {
    this.track = track;
    this.setAlternatives(track);
  }

  getAlternatives() {
    return _.shuffle(this.alternatives);
  }

  setAlternatives(track) {
    this.alternatives = _.sample(track.getRelatedArtists(), 3);
    this.alternatives.push(track.getArtist());
  }

  getRightAnswer() {
    return this.track.getArtist();
  }

  evaluateAnswer(answerGiven) {
    return answerGiven === this.getRightAnswer() ? true : false;
  }
}

module.exports = Question;
