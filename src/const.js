import {
  isDateInFuture,
  isDateInPast,
  isDateInRange,
  sortByDateAscending,
  sortByDurationDescending,
  sortByPriceDescending
} from './util';

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
];


export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const FILTER = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) =>
    points.filter(
      (point) =>
        isDateInFuture(point.dateFrom) ||
        isDateInRange(point.dateFrom, point.dateTo)
    ),
  [FILTER_TYPE.PAST]: (points) =>
    points.filter(
      (point) =>
        isDateInPast(point.dateTo) ||
        isDateInRange(point.dateFrom, point.dateTo)
    )
};

export const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const SORT_DICT = {
  [SORT_TYPES.DAY]: (points) => points.sort(sortByDateAscending),
  [SORT_TYPES.TIME]: (points) => points.sort(sortByDurationDescending),
  [SORT_TYPES.PRICE]: (points) => points.sort(sortByPriceDescending)
};

export const PICTURE_INDEX = {
  MIN: 0,
  MAX: 10
};

export const HOUR_IN_MINUTES = 60;

export const DAY_IN_MINUTES = 1440;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const TIME_FORMAT = 'hh:mm';

export const DATE_WITH_TIME_FORMAT = 'DD/MM/YY hh:mm';

export const TOTAL_POINTS = 20;

export const ELEMENTS_COUNT = {
  MIN: 1,
  MAX: 4
};

export const DAY_TYPES = ['d', 'h'];

export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const DESTINATIONS = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Rome', 'Toronto', 'Moscow', 'Madrid'];

export const POINTS_COUNT = 10;
export const OFFERS_BY_TYPE_COUNT = 15;

export const DESTINATIONS_COUNT = 20;

export const PRICE = {
  MIN: 10,
  MAX: 100
};

export const MODE = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

