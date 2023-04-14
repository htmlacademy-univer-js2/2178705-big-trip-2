import {render, replace} from '../framework/render';
import PointCreateView from '../view/point-create-view';
import EditPointView from '../view/edit-point-view';
import SortView from '../view/sort-view';
import ListPointsView from '../view/list-points-view';
import PointView from '../view/point-view';
import PointModel from '../model/point-model';
import EmptyListView from '../view/empty-list-view';


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
     replace(editPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
     replace(pointComponent, editPointComponent);
    };

    const pushEscKey = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', pushEscKey);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', pushEscKey);
    })
    editPointComponent.setPreviewClickHandler(() => {
      replaceFormToPoint();
      document.addEventListener('keydown', pushEscKey);
    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.addEventListener('keydown', pushEscKey);
    });
    render(pointComponent, this.#component.element);
  }

  init() {
    const points = this.#pointModel.points;

    if (points.length === 0) {
      render(new EmptyListView(), this.#container);
    } else {
      render(new SortView(), this.#component.element);
      render(this.#component, this.#container);
      for (const point of this.#pointModel.points) {
        // render(new PointView(point, destinations, offersByType), this.#container, RenderPosition.BEFOREEND);
        this.#renderPoint(point);
      }
    }
    // render(new PointCreateView(),  this.#component.element);
    // render(new EditPointView(points[1], destinations, offersByType), this.#container, RenderPosition.BEFOREEND);
  }
}
