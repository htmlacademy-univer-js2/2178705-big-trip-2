import { getRndNum, getRndElem } from '../util';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import {
  DESCRIPTIONS,
  DESTINATION_NAMES,
  ELEMENT_COUNT,
  IMAGE_COUNT,
  PRICE,
  POINT_TYPES,
  POINTS_COUNT
} from '../const';

const getRndDescription = () => {
  let description = '';
  for (let i = 0; i < getRndNum(ELEMENT_COUNT.MIN, ELEMENT_COUNT.MAX); i++) {
    description += ` ${getRndElem(DESCRIPTIONS)}`;
  }
  return description;
};

const getRndImage = () => ({
  src: `http://picsum.photos/248/152?r=${getRndNum(IMAGE_COUNT.MIN, IMAGE_COUNT.MAX)}`,
  description: getRndDescription(),
});

const getRndDestination = (id) => ({
  id,
  description: getRndDescription(),
  name: DESTINATION_NAMES[id],
  pictures: Array.from({length: getRndNum(ELEMENT_COUNT.MIN, ELEMENT_COUNT.MAX)}, getRndImage),
});

const getDestinations = () => Array.from({length: DESTINATION_NAMES.length}).map((value, index) => getRndDestination(index));

const getRndOffer = (id, pointType) => ({
  id,
  title: `offer for ${pointType} ${getRndNum(PRICE.MIN, PRICE.MAX)}`,
  price: getRndNum(PRICE.MIN, PRICE.MAX)
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRndNum(ELEMENT_COUNT.MIN, ELEMENT_COUNT.MAX)}).map((value, index) => getRndOffer(index + 1, pointType)),
});

const getOffersByType = () => Array.from({length: POINT_TYPES.length}).map((value, index) => generateOffersByType(POINT_TYPES[index]));

const offersByType = getOffersByType();
const destinations = getDestinations();

const getPoint = () => {
  const offersByTypePoint = getRndElem(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    basePrice: getRndNum(PRICE.MIN, PRICE.MAX),
    dateFrom: dayjs().add(getRndNum(-3, 0), 'day').add(getRndNum(-2, 0), 'hour').add(getRndNum(-59, 0), 'minute'),
    dateTo: dayjs().add(getRndNum(0, 2), 'day').add(getRndNum(0, 2), 'hour').add(getRndNum(0, 59), 'minute'),
    destinationId: getRndElem(destinations).id,
    id: nanoid(),
    isFavorite: Boolean(getRndNum()),
    offerIds: Array.from({length: getRndNum(0, allOfferIdsByTypePoint.length)}).map(() => allOfferIdsByTypePoint[getRndNum(0, allOfferIdsByTypePoint.length - 1)]),
    type: offersByTypePoint.type,
  };
};


const getPoints = () => Array.from({length: POINTS_COUNT}).map(() => getPoint()).sort();

export {getPoints, getDestinations, getOffersByType };
