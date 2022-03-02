const key = 'dLFTQGSJZwzmh6iLdNsp';
const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const add = async (item) => {
  item.score = Number.parseInt(item.score, 10);
  const body = JSON.stringify(item);
  const { result } = await fetch(`${BASE_URL}games/${key}/scores/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).then((response) => response.json());
  return result;
};

export const get = async () => {
  const { result } = await fetch(`${BASE_URL}games/${key}/scores/`).then((response) => response.json());
  return result;
};