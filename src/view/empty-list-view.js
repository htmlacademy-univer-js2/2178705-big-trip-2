import AbstractView from '../framework/view/abstract-view.js';
import { EMPTY_POINTS_TEXT_TYPES } from '../const.js';

const createNoPointTemplate = (filterType) => (
  `<p class="trip-events__msg">
  ${EMPTY_POINTS_TEXT_TYPES[filterType]}</p>`
);

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor(filterType){
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
