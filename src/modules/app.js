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
    this.update();
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newScore = {};
      new FormData(this.form).forEach((value, key) => { newScore[key] = value; });
      await add(newScore);
      this.scores = await get();
      this.update(newScore);
      this.playResults(newScore);
      this.form.reset();
    });
    this.refresh.addEventListener('click', async (e) => {
      e.preventDefault();
      this.scores = await get();
      this.update();
    });
  }

  get scores() {
    return this._scores;
  }

  set scores(val) {
    this._scores = val;
    this._scores.sort((a, b) => b.score - a.score);
  }

  playResults(newScore) {
    let pos = 1;
    let lastScore = this._scores[0].score;
    for (let i = 0; i < this._scores.length; i += 1) {
      const score = this._scores[i];
      if (lastScore > score.score) {
        lastScore = score.score;
        pos += 1;
      }
      if (((newScore.score === score.score) && (newScore.user === score.user)) || (i >= 10)) {
        if (pos === 1) this.play('first-place');
        else if (i < 10) {
          this.play('top-10');
          if (pos < 4) setTimeout(() => this.play('medal'), 2000);
        } else this.play('under-10');
        break;
      }
    }
  }

  play(id) {
    const audio = this.sounds[id];
    if (audio.paused) {
      audio.play();
    } else {
      audio.currentTime = 0;
    }
  }

  update(newScore = {}) {
    let pos = 1;
    let lastScore = (this._scores.length > 0) ? this._scores[0].score : 0;
    this.list.innerHTML = this._scores.map((score, i) => {
      const classList = [];
      if (lastScore > score.score) {
        lastScore = score.score;
        pos += 1;
      }
      if (pos === 1) classList.push('first-place');
      else if (i < 10) {
        classList.push('top-10');
        if (pos < 4) classList.push(`medal-${pos}`);
      } else classList.push('under-10');
      if ((newScore.score === score.score) && (newScore.user === score.user)) classList.push('new');
      return `<li class="${classList.join(' ')}">${score.user}: ${score.score}</li>`;
    }).join('');
    if (newScore.user)setTimeout(() => document.querySelector('.new').classList.remove('new'), 2000);
  }
}