import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../const';

const createSortingTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.DAY}">
      <input data-sort-type=${SORT_TYPES.DAY} id="sort-${SORT_TYPES.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.DAY}" checked>
      <label class="trip-sort__btn" for="sort-${SORT_TYPES.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.EVENT}">
      <input data-sort-type=${SORT_TYPES.EVENT} id="sort-${SORT_TYPES.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.EVENT}" disabled>
      <label class="trip-sort__btn" for="sort-${SORT_TYPES.EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.TIME}">
      <input data-sort-type=${SORT_TYPES.TIME} id="sort-${SORT_TYPES.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.TIME}">
      <label class="trip-sort__btn" for="sort-${SORT_TYPES.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.PRICE}">
      <input data-sort-type=${SORT_TYPES.PRICE} id="sort-${SORT_TYPES.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.PRICE}">
      <label class="trip-sort__btn" for="sort-${SORT_TYPES.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.OFFER}">
      <input data-sort-type=${SORT_TYPES.OFFER} id="sort-${SORT_TYPES.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.OFFER}" disabled>
      <label class="trip-sort__btn" for="sort-${SORT_TYPES.OFFER}">Offers</label>
    </div>
  </form>`
);

export default class SortView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
