import dayjs from 'dayjs';
import {
  isPointDateFuture,
  isPointDateFuturePast,
  isPointDatePast,
  sortDayPoint,
  sortPricePoint,
  sortTimePoint
} from './util';

export const POINTS_COUNT = 1;

export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const DESTINATION_NAMES = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Rome', 'Toronto', 'Moscow', 'Madrid'];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

export const ELEMENT_COUNT = {
  MIN: 1,
  MAX: 4
};

export const IMAGE_COUNT = {
  MIN: 0,
  MAX: 10
};

export const PRICE = {
  MIN: 100,
  MAX: 1000
};

export const USER_ACTIONS = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const SORT_TYPES = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const MODE = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export const EMPTY_POINTS_TEXT_TYPES = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.PAST]: 'There are no past events now',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
};

export const POINT_TEMPLATE = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
};


export const FILTER_DICT = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom) || isPointDateFuturePast(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo) || isPointDateFuturePast(point.dateFrom, point.dateTo)),
};


export const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
export const TIME_FORMAT = 'hh:mm';
export const TOTAL_DAY_MINUTES_COUNT = 1440;
export const HOUR_MINUTES_COUNT = 60;
export const DATE_FORMAT = 'YYYY-MM-DD';


export const SORT_DICT = {
  [SORT_TYPES.DAY]: (points) => points.sort(sortDayPoint),
  [SORT_TYPES.TIME]: (points) => points.sort(sortTimePoint),
  [SORT_TYPES.PRICE]: (points) => points.sort(sortPricePoint)
};
