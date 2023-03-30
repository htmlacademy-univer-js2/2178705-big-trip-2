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

  #renderPoint = (point) => {
    const pointComponent = new PointView(point, this.#pointModel.destinations, this.#pointModel.offersByType);
    const editPointComponent = new EditPointView(point, this.#pointModel.destinations, this.#pointModel.offersByType);

    const replacePointToForm = () => {
      this.#component.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#component.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const pushEscKey = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', pushEscKey);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', pushEscKey);
    });
    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.addEventListener('keydown', pushEscKey);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.addEventListener('keydown', pushEscKey);
    });
    render(pointComponent, this.#component.element);
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offersByType = this.#pointModel.offersByType;

    render(new SortView(), this.#component.element);
    render(this.#component, this.#container);
    render(new PointCreateView(),  this.#component.element);
    // render(new EditPointView(points[1], destinations, offersByType), this.#container, RenderPosition.BEFOREEND);

    for (const point of this.#pointModel.points) {
      // render(new PointView(point, destinations, offersByType), this.#container, RenderPosition.BEFOREEND);
      this.#renderPoint(point);
    }
  }
}
