import AbstractView from '../framework/view/abstract-view.js';


const createEmptyInformationTemplate = () => (
  `<p class="trip-events__msg">
    Sorry, we have a problem ¯\\_(ツ)_/¯
  </p>`);

export default class EmptyInformationView extends AbstractView {

  get template() {
    return createEmptyInformationTemplate();
  }
}
