const API_URL = "https://norma.nomoreparties.space/api/";

const ORDER_DATA = {
  orderNumber: 777777,
  totalorder: 888,
  status: {
    isDone: false,
    statusText: "Ваш заказ начали готовить",
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export { API_URL, ORDER_DATA, delay, checkResponse };
