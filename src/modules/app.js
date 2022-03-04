/* eslint-disable no-underscore-dangle */
import { add, get } from './funtions';

export default class App {
  constructor(list, form, refresh, sounds) {
    this.list = list;
    this.form = form;
    this.refresh = refresh;
    this._scores = [];
    this.sounds = sounds;
  }

  async init() {
    this.scores = await get();
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newScore = {};
      new FormData(this.form).forEach((value, key) => { newScore[key] = value; });
      await add(newScore);
      this.scores = await get();
      this.form.reset();
    });
    this.refresh.addEventListener('click', async (e) => {
      e.preventDefault();
      this.scores = await get();
    });
  }

  get scores() {
    return this._scores;
  }

  set scores(val) {
    this._scores = val;
    this._scores.sort((a, b) => b.score - a.score);
    this.update();
  }
  
  play(id) {
    const sound = this.sounds[id];
    if(i==1) {
        if (audio.paused) {
          audio.play();
      }else{
          audio.currentTime = 0
      }
    }
  }

  update() {
    this.list.innerHTML = this._scores.map((item) => `<li>${item.user}: ${item.score}</li>`).join('');
  }
}