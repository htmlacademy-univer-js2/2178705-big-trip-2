import dayjs from 'dayjs';
import { getRndNumber } from '../util';
import { POINT_TYPES, DAY_TYPES } from '../const';


export const getPoint = (id) => {
  let currentTime = dayjs().add(getRndNumber(-7, 7), DAY_TYPES[getRndNumber(0, 1)]);
  const dateFrom = currentTime;
  const dateTo = currentTime.add(getRndNumber(2, 7), DAY_TYPES[getRndNumber(0, 1)]);
  return {
    basePrice: getRndNumber(50, 500),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: getRndNumber(0, 9),
    id: id,
    isFavorite: Boolean(getRndNumber(0, 1)),
    offers: Array.from({ length: getRndNumber(1, 3) }, () => getRndNumber(0, 4)),
    type: POINT_TYPES[getRndNumber(0, POINT_TYPES.length - 1)],
  };
};
