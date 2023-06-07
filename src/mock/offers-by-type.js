import { getRndNumber } from '../util';
import { getOffer } from './offer';
import { POINT_TYPES } from '../const';

const getOffers = () => {
  const offers = [];
  for (let i = 0; i < getRndNumber(1, 4); i++) {
    offers.push(getOffer(i));
  }
  return offers;
};

export const getOfferByType = (i) => ({
  type: POINT_TYPES[i],
  offers: getOffers(),
});
