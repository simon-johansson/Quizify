
import {merge} from 'lodash';
import {soundManager} from 'soundmanager2';
import nop from 'nop';

soundManager.setup({
  debugMode: false,
});

export default class Sound {
  constructor(audio) {
    this.sound = null;
    this.manager = soundManager;
    this.playSettings = {
      autoPlay: false,
      autoLoad: true,
    };
    this._createSound(audio);
  }

  _createSound(url) {
    const options = merge({url}, this.playSettings);
    this.sound = this.manager.createSound(options);
  }

  _removeSound() {
    if (!this.sound) { return; }
    try {
      this.sound.destruct();
    } catch (e) {}
    delete this.sound;
  }

  play(onfinish = nop) {
    if (!this.sound) { return; }
    this.sound.play({
      volume: 100,
      onfinish
    });
  }

  fadeOut(dur = 3000, toVol = 0, callback = nop) {
    if (!this.sound) { return; }
    let s = this.sound;
    let vol = s.volume;
    let tick = dur / Math.abs(vol - toVol);
    let i = setInterval(() => {
      vol = vol > toVol ? vol - 1 : vol + 1;
      s.setVolume(vol);
      if(vol === toVol){
        callback.call(this);
        this._removeSound();
        clearInterval(i);
      }
    }, tick);
  }
}
