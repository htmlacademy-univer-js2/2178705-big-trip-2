import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import { POINT_TYPES } from '../const';
import { goFirstLetterToUpperCase, createFullDate } from '../util';
import 'flatpickr/dist/flatpickr.min.css';

const renderOffers = (allOffers, markedOffers) => allOffers
  .map((offer) => {
    const checked = markedOffers.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  })
  .join('');

const renderEditingDateTemplate = (dateFrom, dateTo) => `<div class="event__field-group event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${createFullDate(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${createFullDate(dateTo)}">
  </div>`;

const renderPlaceNames = (destinations) => destinations
  .map((destination) => `<option value="${destination.name}"></option>`)
  .join('');

const renderEditingTypeTemplate = (currentType) => POINT_TYPES
  .map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${goFirstLetterToUpperCase(type)}</label>
  </div>`)
  .join('');

const renderPlacePictures = (pictures) => pictures
  .map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
  .join('');

const createEditingPointTemplate = (point, destinations, offers) => {
  const { basePrice, type, destinationId, dateFrom, dateTo, offerIds } = point;
  const allPointTypeOffers = offers.find((offer) => offer.type === type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderEditingTypeTemplate(type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group event__field-group--destination">
          <label class="event__label event__type-output" for="event-destination-${destinationId}">
            ${type}
          </label>
          <input class="event__input event__input--destination" id="event-destination-${destinationId}" type="text" name="event-destination" value="${destinations[destinationId].name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${renderPlaceNames(destinations)}
          </datalist>
        </div>

        ${renderEditingDateTemplate(dateFrom, dateTo)}

        <div class="event__field-group event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section event__section--offers">
          <h3 class="event__section-title event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${renderOffers(allPointTypeOffers.offers, offerIds)}
          </div>
        </section>

        <section class="event__section event__section--destination">
          <h3 class="event__section-title event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinations[destinationId].description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${renderPlacePictures(destinations[destinationId].pictures)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointView extends AbstractStatefulView {
  #destination = null;
  #dateSelection = null;
  #offers = null;

  constructor(point, destination, offers) {
    super();
    this._state = EditPointView.parsePoint(point);
    this.#destination = destination;
    this.#offers = offers;
    this.#setDateTo();
    this.#setDateFrom();
    this.#setPointHandlers();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateSelection) {
      this.#dateSelection.destroy();
      this.#dateSelection = null;
    }
  };

  #setDateTo = () => {
    if (this._state.dateFrom) {
      this.#dateSelection = flatpickr(this.element.querySelector('#event-start-time-1'), {
        enableTime: true,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateFromChangeHandler,
      },);
    }
  };

  #setDateFrom = () => {
    if (this._state.dateTo) {
      this.#dateSelection = flatpickr(this.element.querySelector('#event-end-time-1'), {
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateToChangeHandler,
      },);
    }
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    if (this._state.offerIds.includes(Number(evt.target.id.slice(-1)))) {
      this._state.offerIds = this._state.offerIds.filter((n) => n !== Number(evt.target.id.slice(-1)));
    } else {
      this._state.offerIds.push(Number(evt.target.id.slice(-1)));
    }
    this.updateElement({
      offerIds: this._state.offerIds,
    });
  };

  #setPointHandlers = () => {
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destination.filter((dest) => dest.name === evt.target.value);
    this.updateElement({
      destinationId: destination[0].id,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value, offerIds: [],
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseState(this._state));
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
  };

  static parsePoint = (point) => ({
    ...point, dateTo: dayjs(point.dateTo).toDate(), dateFrom: dayjs(point.dateFrom).toDate()
  });

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  setPreviewClickHandler = (callback) => {
    this._callback.previewClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#previewClickHandler);
  };

  #previewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.previewClick();
  };

  static parseState = (state) => {
    const point = {...state};
    return point;
  };

  get template() {
    return createEditingPointTemplate(this._state, this.#destination, this.#offers);
  }

  reset = (point) => {
    this.updateElement(EditPointView.parsePoint(point),);
  };

  _restoreHandlers = () => {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setPreviewClickHandler(this._callback.previewClick);
    this.#setPointHandlers();
    this.#setDateTo();
    this.#setDateFrom();
  };
}
