import AbstractView from '../framework/view/abstract-view';

const createPointsListTemplate = () => (
  `<ul class="trip-events__list">
    </ul>`
);

export default class ListPointsView extends AbstractView{

  get template() {
    return createPointsListTemplate();
  }
}
