import { render, RenderPosition, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UPDATE_TYPES, USER_ACTIONS } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #editingPointComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  #destinations = null;
  #offers = null;

  #isNewPoint = true;
  #changeData = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData, destinationsModel, offersModel) {
    this.#pointListContainer = pointListContainer;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editingPointComponent !== null) {
      return;
    }
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    this.#editingPointComponent = new EditPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: this.#isNewPoint
    });
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#editingPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#closeOnEscHandler);
  };

  destroy = () => {
    if (this.#editingPointComponent === null) {
      return;
    }
    this.#destroyCallback?.();
    remove(this.#editingPointComponent);
    this.#editingPointComponent = null;
    document.removeEventListener('keydown', this.#closeOnEscHandler);
  };

  setSaving = () => {
    this.#editingPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#editingPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editingPointComponent.shake(resetFormState);
  };

  #closeOnEscHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      USER_ACTIONS.ADD_POINT,
      UPDATE_TYPES.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
