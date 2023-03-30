import {createElement} from '../render';
import {getDuration, humanizeDate} from '../util';
import {dateFormat} from '../const';

const createPointTemplate = (point, destinations, offersByType) => {
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const pointTypeOffers = offersByType.find((off) => off.type === point.type).offers;
  const pointOffers = pointTypeOffers.filter((offer) => point.offers.includes(offer.id))
  const start = point.dateFrom !== null ? humanizeDate(point.dateFrom, dateFormat.MAIN) : '';
  const end = point.dateTo !== null ? humanizeDate(point.dateTo, dateFormat.MAIN): '';
  const duration = getDuration(point.dateFrom, point.dateTo);

  return (`<li class="trip-events__item">
                  <div class="event">
                    <time class="event__date" datetime="${humanizeDate(point.dateFrom, dateFormat.SERVICE_MAIN)}">${humanizeDate(point.dateFrom, dateFormat.MAIN)}</time>
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${point.type} ${pointDestination.name}</h3>
                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${point.dateFrom}">${(start === end) ? humanizeDate(point.dateFrom, dateFormat.VIEW) : start}</time>
                        &mdash;
                        <time class="event__end-time" datetime="${point.dateTo}">${(start === end) ? humanizeDate(point.dateTo, dateFormat.VIEW) : end}</time>
                      </p>
                      <p class="event__duration">${duration}</p>
                    </div>
                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
                    </p>
                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                    ${pointOffers.map((offer) => (
                      `<li class="event__offer">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </li>`
                    )).join('')}

                    </ul>
                    <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                      <span class="visually-hidden">Add to favorite</span>
                      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                      </svg>
                    </button>
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`);
};

export default class PointView {
  #element = null;
  #point = null;
  #destinations = null;
  #offersByType = null;

  constructor(point, destinations, offersByType) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }
  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offersByType);
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
