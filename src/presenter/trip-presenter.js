import { render, remove } from '../framework/render.js';
import SortingView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointsView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { SORT_DICT, FILTER_DICT, SORT_TYPES, UPDATE_TYPES, USER_ACTIONS, FILTER_TYPES} from '../const.js';



export default class BoardPresenter {
  #listPointsComponent = new ListPointsView();
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #noPointsComponent = null;
  #sortPointsComponent = null;
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #newPointPresenter = null;

  constructor({container}, pointsModel, destinationsModel, offersModel, filterModel){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#listPointsComponent.element, this.#handleViewAction, this.#pointsModel,
      this.#destinationsModel, this.#offersModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = FILTER_DICT[this.#filterType](this.#pointsModel.points);
    SORT_DICT[this.#currentSortType](points);
    return points;
  }

  init() {
    this.#renderBoard();
  }

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPES.DAY;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
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
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UPDATE_TYPES.INIT:
        remove(this.#noPointsComponent);
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container);
  };

  #renderSort = () => {
    this.#sortPointsComponent = new SortingView(this.#currentSortType);
    this.#sortPointsComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortPointsComponent, this.#container);

  }

  #renderNoPointView = () => {
    this.#noPointsComponent = new NoPointsView(this.#filterType);
    render(this.#noPointsComponent, this.#container);
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
    const pointPresenter = new PointPresenter(this.#listPointsComponent.element, this.#pointsModel, this.#destinationsModel, this.#offersModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortPointsComponent);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  };

  #renderBoard = () => {
    if (this.#isLoading){
      this.#renderLoading();
      return;
    }
    const pointsCount = this.points.length;

    if (pointsCount === 0) {
      this.#renderNoPointView();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  };

}
