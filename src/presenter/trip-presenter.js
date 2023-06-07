import { render } from '../framework/render';
import ListPointsView from '../view/list-points-view';
import SortView from '../view/sort-view';
import EmptyPointView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import { updateItem } from '../util';

export default class Trip {
  #pointsListComponent = new ListPointsView();
  #container = null;

  #sortComponent = null;
  #emptyPointsListComponent = null;

  #points = null;
  #destinations = null;
  #offersByType = null;

  #pointPresenter = new Map();

  constructor(container, pointsModel) {
    this.#container = container;
    this.#points = pointsModel.points;
    this.#destinations = pointsModel.destinations;
    this.#offersByType = pointsModel.offersByType;
  }

  init() {
    if (this.#points.length === 0) {
      this.#renderEmptyPointsList();
    } else {
      this.#renderSort();
      this.#renderPointsList();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#destinations, this.#offersByType, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#container);
    this.#renderPoints();
  };

  #renderEmptyPointsList = () => {
    if (this.#emptyPointsListComponent === null) {
      this.#emptyPointsListComponent = new EmptyPointView();
    }
    render(this.#emptyPointsListComponent, this.#container);
  };

  #renderSort = () => {
    if (this.#sortComponent === null) {
      this.#sortComponent = new SortView();
    }
    render(this.#sortComponent, this.#container);
  };
}
