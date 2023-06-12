import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { MODE, UPDATE_TYPES, USER_ACTIONS } from '../const.js';


export default class PointPresenter{
  #pointListContainer = null;

  #pointViewComponent = null;
  #editingPointComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  #point = null;
  #destinations = null;
  #offers = null;

  #changeData = null;
  #changeMode = null;
  #mode = MODE.PREVIEW
  #isNewPoint = false;

  constructor(pointListContainer, destinationsModel, offersModel, changeData, changeMode){
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    const previewPointViewComponent = this.#pointViewComponent;
    const previewEditingPointComponent =  this.#editingPointComponent;

    this.#pointViewComponent = new PointView(point, this.#destinations, this.#offers);
    this.#editingPointComponent = new EditPointView({point: point, destinations: this.#destinations, offers: this.#offers, isNewPoint: this.#isNewPoint});

    this.#pointViewComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointViewComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (previewPointViewComponent === null || previewEditingPointComponent === null) {
      render(this.#pointViewComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === MODE.PREVIEW) {
      replace(this.#pointViewComponent, previewPointViewComponent);
    } else if (this.#mode === MODE.EDITING) {
      replace(this.#pointViewComponent, previewEditingPointComponent);
      this.#mode = MODE.PREVIEW;
    }

    remove(previewPointViewComponent);
    remove(previewEditingPointComponent);

  }

  destroy = () => {
    remove(this.#pointViewComponent);
    remove(this.#editingPointComponent);
  };

  setSaving = () => {
    if (this.#mode === MODE.EDITING) {
      this.#editingPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === MODE.EDITING) {
      this.#editingPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === MODE.PREVIEW) {
      this.#pointViewComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editingPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editingPointComponent.shake(resetFormState);
  };

  resetView = () => {
    if (this.#mode !== MODE.PREVIEW) {
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditToTrip();
    }
  };

  #replaceEditToTrip = () => {
    replace(this.#pointViewComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#clsoeOnEscHandler);
    this.#mode = MODE.PREVIEW;
  };

  #replaceTripToEdit = () => {
    replace(this.#editingPointComponent, this.#pointViewComponent);
    document.addEventListener('keydown', this.#clsoeOnEscHandler);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #clsoeOnEscHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#clsoeOnEscHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      USER_ACTIONS.UPDATE_POINT,
      UPDATE_TYPES.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleEditClick = () => {
    this.#replaceTripToEdit();
  };

  #handlePreviewClick = () => {
    this.resetView();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      USER_ACTIONS.UPDATE_POINT,
      UPDATE_TYPES.MINOR,
      point,
    );
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      USER_ACTIONS.DELETE_POINT,
      UPDATE_TYPES.MINOR,
      point,
    );
  };
}
