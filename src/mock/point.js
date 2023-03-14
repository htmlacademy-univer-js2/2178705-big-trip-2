import { getRandomNum, getRandomElementsArray } from '../util';
import dayjs from 'dayjs';

const minPrice = 50;
const maxPrice = 1000;

const offerTitles = ['Upgrade to a business class', 'Order a taxi', 'Meet with a sign', 'All inclusive', 'Lunch', 'Rent a car'];
const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const cities = ['Moscow', 'Ekaterinburg', 'Barnaul', 'Perm', 'Tumen', 'Saint-Petersburg', 'Omsk', 'Ryazan', 'Voronezh'];
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
];

const minOfferPrice = 10;
const maxOfferPrice = 300;

const minCountOffers = 3;
const maxCountOffers = 6;

const offerByTypeCount = 6;

const time = {
  days: {
    min: 1,
    max: 5,
  },
  hours: {
    min: 1,
    max: 12,
  },
  minutes: {
    min: 1,
    max: 59,
  },
};

const minDescriptionsCount = 1;
const maxDescriptionsCount = 3;

const minPicturesCount = 1;
const maxPicturesCount = 4;

const destinationCount = 5;

const createOffer = (index) => ({
  id: index + 1,
  title: getRandomElementsArray(offerTitles, 1),
  price: getRandomNum(minOfferPrice, maxOfferPrice),
});

const createOfferByType = () => ({
  type: getRandomElementsArray(pointTypes),
  offers: Array.from({length: getRandomNum(minCountOffers, maxCountOffers)}, (_, index) => createOffer(index))
});

const generatePictues = () => ({
  'src': `http://picsum.photos/248/152?r=${getRandomNum(1, 999)}$`,
  'description': getRandomElementsArray(descriptions, 1),
});

const createDestination = (index) => ({
  id: index + 1,
  description: getRandomElementsArray(descriptions, getRandomNum(minDescriptionsCount, maxDescriptionsCount)),
  name: getRandomElementsArray(cities, 1),
  pictures: Array.from({ length: getRandomNum(minPicturesCount, maxPicturesCount) }, generatePictues),
});

const getDate = () => dayjs().add(getRandomNum(time.days.min, time.days.max), 'D')
  .add(getRandomNum(time.hours.min, time.hours.max), 'hh')
  .add(getRandomNum(time.minutes.min, time.minutes.max), 'MM');


const generateDate = () => {
  const date1 = getDate();
  const date2 = getDate();
  if (date2.isAfter(date1)) {
    return {
      dateFrom: date1.toISOString(),
      dateTo: date2.toISOString(),
    };
  }
  return {
    dateFrom: date2.toISOString(),
    dateTo: date1.toISOString(),
  };
};

const offersByType = Array.from({length: offerByTypeCount}, createOfferByType);

const getRandomID = () => {
  const randomOffers = getRandomElementsArray(offersByType).offers;
  const id = [];
  const length = getRandomNum(1, randomOffers.length);
  while (id.length < length) {
    const currentElem = getRandomNum(0, randomOffers.length);
    if (!id.includes(currentElem)){
      id.push(currentElem);
    }
  }

  return id;
};

const destinations = Array.from({length: getRandomNum(1, destinationCount)},  (_, index) => createDestination(index));

const generatePoint = (count) => {
  const date = generateDate();
  return {
    basePrice: getRandomNum(minPrice, maxPrice),
    dateFrom: date.dateFrom,
    dateTo: date.dateTo,
    destination: getRandomElementsArray(destinations.id, 1),
    id: count,
    isFavorite: Boolean(getRandomNum(0, 1)),
    offers: getRandomID(),
    type: getRandomElementsArray(pointTypes, 1),
  };
};

const createPoints = (count) => Array.from({length: count}, (_, index) => generatePoint(index));
export {destinations, offersByType, createPoints};

