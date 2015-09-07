'use strict';

import Track from './Track';

export default class Round {
  constructor(track) {
    this.hasEnded = false;
    this.isShowing = false;
    this.track = new Track(track);
  }
}
