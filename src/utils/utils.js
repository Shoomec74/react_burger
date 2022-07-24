const API_URL = "https://norma.nomoreparties.space/api/";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export { API_URL, delay, checkResponse };
