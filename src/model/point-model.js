import {points} from '../mock/point';
import {destinations} from '../mock/destinations';
import {offersByType} from '../mock/offer';

export default class PointModel {
  constructor() {
    this.points = points;
    this.destinations = destinations;
    this.offersByType = offersByType;
  }
  getPoints() {
    return this.points;
  }
  getDestinations() {
    return this.destinations;
  }
  getOffersByType() {
    return this.offersByType;
  }
}
