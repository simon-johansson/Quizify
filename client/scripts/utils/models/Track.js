
import {pluck} from 'lodash';
import Sound from './Sound';
import loadImages from 'load-images';

export default class Track extends Sound {
  constructor(track) {
    super(track.audio);

    this.title = track.title;
    this.images = track.images;
    this.artist = track.artist;
    this.meta = track.meta;

    loadImages(pluck(track.images, 'url'));
  }
}
