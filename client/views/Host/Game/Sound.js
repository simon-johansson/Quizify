'use strict';

import { soundManager } from 'soundmanager2';
import _ from 'lodash';
import nop from 'nop';

soundManager.setup({
  debugMode: false,
});

export default class Sound {
  constructor(settings = {}) {
    this.manager = soundManager;
    this.playSettings = _.merge({
      autoPlay: false,
      autoLoad: true,
    }, settings);
    this.sound = null;
  }

  _removeSound() {
    if (!this.sound) { return; }
    try {
      this.sound.destruct();
    } catch (e) {}
    delete this.sound;
  }

  createSound(url) {
    if (!url) { return; }
    const options = _.merge({url}, this.playSettings);
    this.sound = this.manager.createSound(options);
  }

  play() {
    if (this.sound) {
      this.sound.play({
        volume: 100
      });
    }
  }

  fadeOut(dur = 2000, toVol = 0, callback = nop) {
    let vol = this.sound.volume;
    let tick = dur / Math.abs(vol - toVol);
    let i = setInterval(() => {
      vol = vol > toVol ? vol - 1 : vol + 1;
      this.sound.setVolume(vol);
      if(vol === toVol){
        callback.call(this);
        this._removeSound();
        clearInterval(i);
      }
    }, tick);
  }
}
