import AbstractView from '../framework/view/abstract-view.js';
import { EMPTY_POINTS_TEXT_TYPES } from '../const.js';

const emptyPointsListTemplate = (filterType) => (
  `<p class="trip-events__msg">
  ${EMPTY_POINTS_TEXT_TYPES[filterType]}</p>`
);

export default class EmptyPointsListView extends AbstractView {
  #filterType = null;

  constructor(filterType){
    super();
    this.#filterType = filterType;
  }

  get template() {
    return emptyPointsListTemplate(this.#filterType);
  }
}
