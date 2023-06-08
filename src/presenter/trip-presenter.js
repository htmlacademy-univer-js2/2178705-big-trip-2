import { render, RenderPosition } from '../framework/render';
import ListPointsView from '../view/list-points-view';
import SortView from '../view/sort-view';
import EmptyPointView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import { updateItem } from '../util';
import { SORT_TYPES, SORT_DICT } from '../const';

export default class Trip {
  #pointsListComponent = new ListPointsView();
  #selectedTypeOfSort = SORT_TYPES.DAY;
  #prevPoints = [];
  #tripContainer = null;
  #pointModel = null;
  #sortComponent = new SortView();
  #emptyPointsListComponent = new EmptyPointView();
  #pointsList = null;
  #pointPresenter = new Map();

  constructor(container, pointsModel) {
    this.#tripContainer = container;
    this.#pointModel = pointsModel;
  }

  init() {
    this.#pointsList = [...this.#pointModel.points]
    this.#prevPoints = [...this.#pointModel.points];

    if (this.#pointsList.length === 0) {
      this.#renderEmptyPoints();
    } else {
      this.#renderSort();
      this.#renderPointsList();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#prevPoints = updateItem(this.#prevPoints, updatedPoint)
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };


  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#pointModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#pointsList.slice(from, to)
      .forEach((point) => this.#renderPoint(point))
  };

  #renderEmptyPoints = () => {
    render(this.#emptyPointsListComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints(0, this.#pointsList.length);
  };

  #renderSort = () => {
    SORT_DICT[SORT_TYPES.DAY](this.#pointsList);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN)
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortButton);
  };

  #handleSortButton = (type) => {
    if (type === this.#selectedTypeOfSort) {
      return;
    }

    this.#sortPoints(type);
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #sortPoints = (type) => {
    SORT_DICT[type](this.#pointsList);
    this.#selectedTypeOfSort = type;
  }
}
