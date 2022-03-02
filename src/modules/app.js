/* eslint-disable no-underscore-dangle */
import { add, get, init } from './funtions';

export default class App {
  constructor(list, form, refresh) {
    this.list = list;
    this.form = form;
    this.refresh = refresh;
    this._scores = [];
  }

  async init() {
    await init();
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newScore = {};
      new FormData(this.form).forEach((value, key) => { newScore[key] = value; });
      await add(newScore);
      this.scores = await get();
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

  update() {
    this.list.innerHTML = this._scores.map((item) => `<li>${item.user}: ${item.score}</li>`).join('');
  }
}