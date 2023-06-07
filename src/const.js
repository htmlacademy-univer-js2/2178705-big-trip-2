export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
];

export const TITLES_OFFER = [
  'Add a child safety seat',
  'Stay overnight',
  'Add lunch',
  'Rent a polaroid',
  'Add a place for a pet',
  'Book a window seat',
  'Book a place in the recreation area',
  'Use the translator service',
  'Upgrade to a business class'
];

export const SORT_DATE = {
  DAY: (firstPoint, secondPoint) => firstPoint.dateFrom.diff(secondPoint.dateFrom),
  TIME: (firstPoint, secondPoint) => secondPoint.dateFrom.diff(secondPoint.dateTo) - firstPoint.dateFrom.diff(firstPoint.dateTo),
  PRICE: (firstPoint, secondPoint) => firstPoint.basePrice - secondPoint.basePrice,
};

export const SORT_TYPES = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

export const IMAGE_REFERENCE = 'http://picsum.photos/248/152?r=';
export const DAY_TYPES = ['d', 'h'];

export const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'drive',
  'flight',
  'ship',
];

export const CITIES = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Rome', 'Toronto', 'Moscow', 'Madrid'];

export const POINTS_COUNT = 10;
export const OFFERS_BY_TYPE_COUNT = 15;

export const DESTINATIONS_COUNT = 20;

