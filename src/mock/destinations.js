import { getRndNumber } from '../util';
import { CITIES, DESCRIPTIONS, IMAGE_REFERENCE } from '../const';

export const getDestination = (id) => ({
  id: id,
  description: DESCRIPTIONS[getRndNumber(0, DESCRIPTIONS.length - 1)],
  name: CITIES[getRndNumber(0, CITIES.length - 1)],
  pictures: [
    {
      src: `${IMAGE_REFERENCE}${getRndNumber(0, 100)}`,
      description: DESCRIPTIONS[getRndNumber(0, DESCRIPTIONS.length - 1)],
    },
  ],
});
