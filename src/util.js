import dayjs from 'dayjs';
import {DATE_FORMAT, DATE_TIME_FORMAT, HOUR_MINUTES_COUNT, TIME_FORMAT, TOTAL_DAY_MINUTES_COUNT} from './const';

export const goLetterToUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const isPointDateFuture = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;
export const isPointDatePast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;
export const isPointDateFuturePast = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;

const getZeroInDuration = (value) =>{
  if (value < 9){
    return `0${value}`;
  } else {
    return `${value}`;
  }
};
export const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);
export const humanizeTime = (date) => dayjs(date).format('DD MMM');
export const getTime = (date) => dayjs(date).format(TIME_FORMAT);
export const getDate = (date) => dayjs(date).format(DATE_FORMAT);
export const duration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.floor((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - (days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);

  const daysOutput = (days) ? `${getZeroInDuration(days)}D` : '';
  const hoursOutput = (restHours) ? `${getZeroInDuration(restHours)}H` : '';
  const minutesOutput = (restMinutes) ? `${getZeroInDuration(restMinutes)}M` : '';


  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

export const sortPricePoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortDayPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortTimePoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};
