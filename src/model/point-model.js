import Observable from '../framework/observable.js';
import { UPDATE_TYPES } from '../const';

export default class PointsModel extends Observable {
  #points = [];
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#formatToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UPDATE_TYPES.INIT);
  }

  get points() {
    return this.#points;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }
    if (Number(update.basePrice) <= 0) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#formatToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(error) {
      throw new Error('Can\'t update point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(error) {
      throw new Error('Can\'t delete point');
    }
  };

  addPoint = async (updateType, update) => {
    if (Number(update.basePrice) <= 0) {
      throw new Error('Can\'t add unexisting task');
    }
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#formatToClient(response);
      this.#points.unshift(newPoint);
      this._notify(updateType, newPoint);
    } catch(error) {
      throw new Error('Can\'t add point');
    }
  };

  #formatToClient = (point) => {
    const formattedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete formattedPoint['base_price'];
    delete formattedPoint['date_from'];
    delete formattedPoint['date_to'];
    delete formattedPoint['is_favorite'];

    return formattedPoint;
  };
}
