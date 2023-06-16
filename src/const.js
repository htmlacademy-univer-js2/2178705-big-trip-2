import dayjs from 'dayjs';
import {
  isPointDateFuture,
  isPointDateFuturePast,
  isPointDatePast,
  sortDayPoint,
  sortPricePoint,
  sortTimePoint
} from './util';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const USER_ACTIONS = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SORT_TYPES = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const MODE = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

const EMPTY_POINTS_TEXT_TYPES = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.PAST]: 'There are no past events now',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
};

const POINT_TEMPLATE = {
  basePrice: 250,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 1,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
};


const FILTER_DICT = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom) || isPointDateFuturePast(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo) || isPointDateFuturePast(point.dateFrom, point.dateTo)),
};


const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
const TOTAL_DAY_MINUTES_COUNT = 1440;
const HOUR_MINUTES_COUNT = 60;
const DATE_FORMAT = 'YYYY-MM-DD';


const SORT_DICT = {
  [SORT_TYPES.DAY]: (points) => points.sort(sortDayPoint),
  [SORT_TYPES.TIME]: (points) => points.sort(sortTimePoint),
  [SORT_TYPES.PRICE]: (points) => points.sort(sortPricePoint)
};

export { SORT_TYPES, SORT_DICT, MODE, DATE_FORMAT, UPDATE_TYPES, HOUR_MINUTES_COUNT, USER_ACTIONS, FILTER_DICT,
  FILTER_TYPES, POINT_TEMPLATE, POINT_TYPES, EMPTY_POINTS_TEXT_TYPES, DATE_TIME_FORMAT,
  TIME_FORMAT, TOTAL_DAY_MINUTES_COUNT };
