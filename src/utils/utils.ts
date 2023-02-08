interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

function request(url: string, options?: RequestOptions) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Moscow",
  });

  let dateOfOrder = new Date(date);

  const today = new Date();

  function diffSubtract(dayOne: any, dayTwo: any) {
    return Math.ceil((dayOne - dayTwo) / 86400000);
  }

  let dayQty = diffSubtract(today, dateOfOrder);

  const formatterForFay = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    year: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  });

  const formatDay = (dateOfOrder: any, dayQty: any) => {
    if (formatterForFay.format(today) === formatterForFay.format(dateOfOrder)) {
      return "Cегодня";
    }
    if (dayQty === 1) {
      return "Вчера";
    }
    if (dayQty === 2 || dayQty === 3 || dayQty === 4) {
      return `${dayQty} дня назад`;
    }
    if (dayQty > 4) {
      return `${dateOfOrder.toLocaleDateString("ru-RU")}`;
    }
  };
  return `${formatDay(dateOfOrder, dayQty)}, ${formatter.format(
    dateOfOrder
  )} i-GMT+3`;
};

export { delay, request, formatDate };
