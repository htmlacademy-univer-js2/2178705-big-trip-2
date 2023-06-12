import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FILTER_DICT, FILTER_TYPES, UPDATE_TYPES } from '../const.js';

export default class FilterPresenter {
  #container = null;
  component = null;

  #filterModel = null;
  #pointsModel = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#container = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FILTER_TYPES.EVERYTHING,
        name: 'EVERYTHING',
        count: FILTER_DICT[FILTER_TYPES.EVERYTHING](points).length,
      },
      {
        type: FILTER_TYPES.PAST,
        name: 'PAST',
        count: FILTER_DICT[FILTER_TYPES.PAST](points).length,
      },
      {
        type: FILTER_TYPES.FUTURE,
        name: 'FUTURE',
        count: FILTER_DICT[FILTER_TYPES.FUTURE](points).length,
      },
    ];
  }

  init = () => {
    const previousFilterComponent = this.component;

    this.component = new FilterView(this.filters, this.#filterModel.filter);
    this.component.setFilterTypeChangeHandler(this.#handleTypeChange);

    if (previousFilterComponent === null) {
      render(this.component, this.#container);
      return;
    }

    replace(this.component, previousFilterComponent);
    remove(previousFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleTypeChange = (type) => {
    if (this.#filterModel.filter === type) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, type);
  };
}
