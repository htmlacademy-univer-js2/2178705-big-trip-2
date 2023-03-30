import {render, RenderPosition} from '../render';
import PointCreateView from '../view/point-create-view';
import EditPointView from '../view/edit-point-view';
import SortView from '../view/sort-view';
import ListPointsView from '../view/list-points-view';
import PointView from '../view/point-view';
import PointModel from '../model/point-model';

export default class Trip {
  #component = null;
  #container = null;
  #pointModel = null;
  constructor({container}) {
    this.#component = new ListPointsView();
    this.#container = container;
    this.#pointModel = new PointModel();
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offersByType = this.#pointModel.offersByType;

    render(new SortView(), this.#container, RenderPosition.BEFOREEND);
    render(this.#component, this.#container);
    render(new PointCreateView(), this.#container, RenderPosition.BEFOREEND);
    render(new EditPointView(points[1], destinations, offersByType), this.#container, RenderPosition.BEFOREEND);

    for (const point of points) {
      render(new PointView(point, destinations, offersByType), this.#container, RenderPosition.BEFOREEND);
    }
  }
}
