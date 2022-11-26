function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}
export { delay, request };
