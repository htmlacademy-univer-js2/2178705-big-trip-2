import Observable from '../framework/observable.js';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(error) {
      this.#offers = [];
    }
  };

  get offers() {
    return this.#offers;
  }
}
