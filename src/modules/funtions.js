const GAME_KEY = 'y1Y8frWTDlC3lZtFMOIV';
const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const add = async (item) => {
  item.score = Number.parseInt(item.score, 10);
  const body = JSON.stringify(item);
  const { result } = await fetch(`${BASE_URL}games/${GAME_KEY}/scores/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).then((response) => response.json());
  return result;
};

export const get = async () => {
  const { result } = await fetch(`${BASE_URL}games/${GAME_KEY}/scores/`).then((response) => response.json());
  return result;
};