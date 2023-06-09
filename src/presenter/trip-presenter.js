import { render, remove, RenderPosition } from '../framework/render.js';
import SortingView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointsView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { SORT_DICT, FILTER_DICT, SORT_TYPES, UPDATE_TYPES, USER_ACTIONS, FILTER_TYPES} from '../const.js';



export default class BoardPresenter {
  #listPointsComponent = new ListPointsView();
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #emptyListPointsComponent = null;
  #sortComponent = null;
  #pointPresenter = new Map();
  #selectedTypeOfSorting = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #newPointPresenter = null;

  constructor({container}, pointsModel, filterModel){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#listPointsComponent.element, this.#handleViewAction, this.#pointsModel);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = FILTER_DICT[this.#filterType](this.#pointsModel.points);
    SORT_DICT[this.#selectedTypeOfSorting](points);
    return points;
  }

  init() {
    this.#renderBoard();
  }

  createPoint = (callback) => {
    this.#selectedTypeOfSorting = SORT_TYPES.DAY;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (type, updateType, update) => {
    switch (type) {
      case USER_ACTIONS.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case USER_ACTIONS.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case USER_ACTIONS.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearTrip();
        this.#renderBoard();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (type) => {
    if (this.#selectedTypeOfSorting === type){
      return;
    }

    this.#selectedTypeOfSorting = type;
    this.#clearTrip();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#selectedTypeOfSorting);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);

  }

  #renderEmptyPointList = () => {
    this.#emptyListPointsComponent = new NoPointsView(this.#filterType);
    render(this.#emptyListPointsComponent, this.#container);
  }


  #renderPointsList = () => {
    render (this.#listPointsComponent, this.#container);
    this.#renderPoints();
  }

  #renderPoints = () => {
    for (const point of this.points){
      this.#renderPoint(point);
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#emptyListPointsComponent) {
      remove(this.#emptyListPointsComponent);
    }

    if (resetSortType) {
      this.#selectedTypeOfSorting = SORT_TYPES.DAY;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderEmptyPointList();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  };

}
