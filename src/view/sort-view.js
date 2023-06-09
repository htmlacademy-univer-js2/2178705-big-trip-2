import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../const.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.DAY}">
    <input ${currentSortType === SORT_TYPES.DAY ? 'checked' : ''} data-sort-type=${SORT_TYPES.DAY} id="sort-${SORT_TYPES.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.DAY}" checked>
    <label class="trip-sort__btn" for="sort-${SORT_TYPES.DAY}">Day</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.TIME}">
    <input ${currentSortType === SORT_TYPES.TIME ? 'checked' : ''} data-sort-type=${SORT_TYPES.TIME} id="sort-${SORT_TYPES.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.TIME}">
    <label class="trip-sort__btn" for="sort-${SORT_TYPES.TIME}">Time</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--${SORT_TYPES.PRICE}">
    <input ${currentSortType === SORT_TYPES.PRICE ? 'checked' : ''} data-sort-type=${SORT_TYPES.PRICE} id="sort-${SORT_TYPES.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPES.PRICE}">
    <label class="trip-sort__btn" for="sort-${SORT_TYPES.PRICE}">Price</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`
);

export default class SortingView extends AbstractView {
  #type = null;

  constructor(currentSortType) {
    super();
    this.#type = currentSortType;
  }

  get template () {
    return createSortTemplate(this.#type);
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
