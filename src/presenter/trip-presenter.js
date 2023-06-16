import {FILTER_DICT, FILTER_TYPES, SORT_DICT, SORT_TYPES, UPDATE_TYPES, USER_ACTIONS} from '../const';
import {remove, render} from '../framework/render';
import PointPresenter from './point-presenter';
import EmptyPointsListView from '../view/empty-list-view';
import SortView from '../view/sort-view';
import NewPointPresenter from './new-point-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {TIME_LIMITER} from '../http/api';
import LoadingView from '../view/loading-view';
import ListPointsView from '../view/list-points-view';
import EmptyInformationView from '../view/empty-information-view';
import InformationPresenter from './information-presenter';

export default class TripPresenter {
  #listPointsComponent = new ListPointsView();
  #loadingComponent = new LoadingView();
  #noPointsComponent = null;
  #sortPointsComponent = null;
  #emptyInformationComponent = new EmptyInformationView();
  #container = null;
  #informationContainer = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #isLoading = true;

  #newPointPresenter = null;
  #informationPresenter = null;
  #pointPresenter = new Map();

  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #uiBlocker = new UiBlocker(TIME_LIMITER.LOWER_LIMIT, TIME_LIMITER.UPPER_LIMIT);

  constructor(container, informationContainer, pointsModel, destinationsModel, offersModel, filterModel){
    this.#container = container;
    this.#informationContainer = informationContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#listPointsComponent.element, this.#handleViewAction,
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
    this.#renderTrip();
  }

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPES.DAY;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      render(this.#listPointsComponent, this.#container);
    }
    this.#newPointPresenter.init(callback);
  };

  #renderInformation = () => {
    this.#informationPresenter = new InformationPresenter(this.#informationContainer, this.#destinationsModel, this.#offersModel);
    const sortedPoints = SORT_DICT[SORT_TYPES.DAY](this.points);
    if (sortedPoints.length === 0){
      return;
    }
    this.#informationPresenter.init(sortedPoints);
  };

  #clearInformation = () => {
    this.#informationPresenter.destroy();
  };

  #renderEmptyInformation = () => {
    render(this.#emptyInformationComponent, this.#container);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case USER_ACTIONS.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTIONS.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case USER_ACTIONS.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearTrip();
        this.#clearInformation();
        this.#renderInformation();
        this.#renderTrip();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
      case UPDATE_TYPES.INIT:
        remove(this.#noPointsComponent);
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        this.#renderInformation();
        break;
    }
  };

  #handleSortTypeChange = (type) => {
    if (this.#currentSortType === type){
      return;
    }

    this.#currentSortType = type;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderTrip = () => {
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
    const pointPresenter = new PointPresenter(this.#listPointsComponent.element, this.#destinationsModel, this.#offersModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderSort = () => {
    this.#sortPointsComponent = new SortView(this.#currentSortType);
    this.#sortPointsComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortPointsComponent, this.#container);
  }

  #renderNoPointView = () => {
    this.#noPointsComponent = new EmptyPointsListView(this.#filterType);
    render(this.#noPointsComponent, this.#container);
  }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container);
  };

  #clearTrip = ({resetSortType = false} = {}) => {
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
}
