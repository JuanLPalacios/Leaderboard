import './main.css';
import App from './modules/app';

const sounds = {};
document.querySelectorAll('audio').forEach((audio) => {
  sounds[audio.id] = audio;
});
new App(
  document.getElementById('list'),
  document.forms[0],
  document.getElementById('refresh'),
  sounds,
).init();