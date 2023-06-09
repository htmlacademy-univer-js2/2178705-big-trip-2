import { render, RenderPosition, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UPDATE_TYPES, USER_ACTIONS } from '../const.js';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {
  #container = null;
  #editingPointComponent = null;
  #changeData = null;
  #destroyCallback = null;
  #pointsModel = null;
  #destinations = null;
  #offers = null;
  #isNewPoint = true;

  constructor(pointListContainer, changeData, pointsModel) {
    this.container = pointListContainer;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editingPointComponent !== null) {
      return;
    }
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;

    this.#editingPointComponent = new EditPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: this.#isNewPoint
    });
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#editingPointComponent, this.container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  destroy = () => {
    if (this.#editingPointComponent === null) {
      return;
    }
    this.#destroyCallback?.();
    remove(this.#editingPointComponent);
    this.#editingPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      USER_ACTIONS.ADD_POINT,
      UPDATE_TYPES.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };
}
