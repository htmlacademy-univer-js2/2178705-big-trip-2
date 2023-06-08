export const getRndNumber = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

export function goUpperCaseLetter(str) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

export const humanizeDateTime = (dateFrom, dateTo) => {
  const oneMinuteInMilliseconds = 60 * 1000;
  const oneHourInMilliseconds = 60 * oneMinuteInMilliseconds;
  const oneDayInMilliseconds = 24 * oneHourInMilliseconds;

  const timeBetween = dateTo.diff(dateFrom);
  if (timeBetween > oneDayInMilliseconds) {
    return `${parseInt(timeBetween / oneDayInMilliseconds, 10)}D ${parseInt((timeBetween % oneDayInMilliseconds) / oneHourInMilliseconds, 10)}H ${
      parseInt(timeBetween % oneHourInMilliseconds, 10) / oneMinuteInMilliseconds
    }M`;
  } else if (timeBetween > oneHourInMilliseconds) {
    return `${parseInt((timeBetween % oneDayInMilliseconds) / oneHourInMilliseconds, 10)}H ${parseInt(timeBetween % oneHourInMilliseconds, 10) / oneMinuteInMilliseconds}M`;
  } else {
    return `${parseInt(timeBetween % oneHourInMilliseconds, 10) / oneMinuteInMilliseconds}M`;
  }
};

export const isDateBefore = (dateFrom, dateTo) => dateTo.diff(dateFrom) > 0;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
