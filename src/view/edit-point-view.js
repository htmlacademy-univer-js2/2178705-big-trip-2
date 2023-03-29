import {createElement} from '../render';
import {points} from '../mock/point';
import {dateFormat, POINT_TYPES} from '../const';
import {humanizeDate} from '../util';
const upper = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitles = (title) => title.split(' ').join('_');

const createEditPointTemplate = (point, destinations, offersByType) => {
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const pointTypeOffers = offersByType.find((off) => off.type === point.type).offers;
  const pointOffers = pointTypeOffers.filter((offer) => point.offers.includes(offer.id))
  return (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle${point.id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle${point.id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${POINT_TYPES.map((type) => (
                        `<div class="event__type-item">
                          <input id="event-type-${type}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${point.id}">${upper(type)}</label>
                        </div>`)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination${point.id}">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination${point.id}" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list${point.id}">
                    <datalist id="destination-list${point.id}">
                    ${destinations.map((dest) => (
                      `<option value="${dest.name}"></option>`
                    )).join('')}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time${point.id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time${point.id}" type="text" name="event-start-time" value="${humanizeDate(point.dateFrom, dateFormat.EDIT)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time${point.id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time${point.id}" type="text" name="event-end-time" value="${humanizeDate(point.dateTo, dateFormat.EDIT)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price${point.id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price${point.id}" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>



                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${pointTypeOffers.map((typeOffer) => (
                    `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitles(typeOffer.title)}${point.id}" type="checkbox" name="event-offer-${formatOfferTitles(typeOffer.title)}" ${point.offers.includes(typeOffer.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${formatOfferTitles(typeOffer.title)}${point.id}">
                          <span class="event__offer-title">${typeOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${typeOffer.price}</span>
                        </label>
                      </div>`
                    )).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestination.description}</p>

                     <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${pointDestination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
              </li>`);
};

export default class EditPointView {
  constructor(point, destinations, offersByType) {
    this.point = point
    this.destinations = destinations;
    this.offersByType = offersByType;
  }
  getTemplate() {
    return createEditPointTemplate(this.point, this.destinations, this.offersByType);
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
