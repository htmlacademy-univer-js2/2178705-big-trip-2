import { getRndNumber } from '../util';
import { TITLES_OFFER } from '../const';

export const getOffer = (id) => ({
  id: id,
  title: TITLES_OFFER[getRndNumber(0, TITLES_OFFER.length - 1)],
  price: getRndNumber(10, 100),
});
