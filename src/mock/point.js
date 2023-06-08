import dayjs from 'dayjs';
import {getRndElem, getRndNum} from '../util';
import {
  ELEMENTS_COUNT, PICTURE_INDEX, TOTAL_POINTS, DESTINATIONS, DESCRIPTIONS, PRICE, POINT_TYPES
} from '../const';
import {nanoid} from 'nanoid';

const createDescription = () => {
  let description = '';
  for (let i = 0; i < getRndNum(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX); i++) {
    description += ` ${getRndElem(DESCRIPTIONS)}`;
  }
  return description;
};

const createPicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRndNum(PICTURE_INDEX.MIN, PICTURE_INDEX.MAX)}`,
  description: createDescription(),
});

const createDestination = (id) => ({
  id,
  name: DESTINATIONS[id],
  description: createDescription(),
  pictures: Array.from({length: getRndNum(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX)}, createPicture),
});

export const getDestinations = () => Array.from({length: DESTINATIONS.length}).map((value, index) => createDestination(index));

const createOffer = (id, pointType) => ({
  id, title: `offer for ${pointType}`, price: getRndNum(PRICE.MIN, PRICE.MAX)
});

const createOffersType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRndNum(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX)}).map((value, index) => createOffer(index + 1, pointType)),
});

export const getOffersType = () => Array.from({length: POINT_TYPES.length}).map((value, index) => createOffersType(POINT_TYPES[index]));

const createPoint = () => {
  const offersIdByType = getRndElem(getOffersType()).offers.map((offer) => offer.id);
  return {
    id: nanoid(),
    destinationId: getRndElem(getDestinations()).id,
    offerIds: Array.from({length: getRndNum(0, offersIdByType.length)}).map(() => offersIdByType[getRndNum(0, offersIdByType.length - 1)]),
    basePrice: getRndNum(PRICE.MIN, PRICE.MAX),
    dateFrom: dayjs().add(getRndNum(0, 3), 'day').add(getRndNum(0, 12), 'hour').add(getRndNum(-59, 0), 'minute'),
    dateTo: dayjs().add(getRndNum(3, 6), 'day').add(getRndNum(12, 23), 'hour').add(getRndNum(0, 59), 'minute'),
    isFavorite: Boolean(getRndNum()),
    type: getRndElem(getOffersType()).type,
  };
};

export const getPoints = () => Array.from({length: TOTAL_POINTS}).map(() => createPoint()).sort();
