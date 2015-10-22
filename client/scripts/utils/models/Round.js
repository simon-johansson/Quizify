
import Track from './Track';

export default class Round {
  constructor(track) {
    this.hasEnded = false;
    this.isShowing = false;
    this.track = track ? new Track(track) : {};
    this.answers = [];
    this.points = 10;
  }
}
