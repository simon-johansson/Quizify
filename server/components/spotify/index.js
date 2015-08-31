'use strict';

let request = require('./request');
let Question = require('./Question');

module.exports = {
  getQuestion(clb) {
    request.getTrack(track => {
      let q = new Question(track);
      return clb(q);
    });
  },
  getTrack(clb) {
    request.getTrack((err, track) => clb(err, track));
  }
};
