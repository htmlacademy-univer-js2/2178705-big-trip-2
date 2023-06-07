import {getDestination} from '../mock/destinations';
import {getOfferByType} from '../mock/offers-by-type';
import {getPoint} from '../mock/point';
import {DESTINATIONS_COUNT, OFFERS_BY_TYPE_COUNT, POINTS_COUNT} from '../const';

export default class PointModel {
  #destinations = null;
  #offersByType = null;
  #points = null;

  constructor() {
    this.#destinations = [];
    this.#offersByType = [];
    this.#points = [];

    for (let i = 0; i < POINTS_COUNT; i++) {
      this.#points = [...this.#points, getPoint(i)]
    }

    for (let i = 0; i < OFFERS_BY_TYPE_COUNT; i++) {
      this.#offersByType = [...this.offersByType, getOfferByType(i)];
    }

    for (let i = 0; i < DESTINATIONS_COUNT; i++) {
      this.#destinations = [...this.#destinations, getDestination(i)];
    }
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
