import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { MODE, UPDATE_TYPES, USER_ACTIONS } from '../const.js';


export default class PointPresenter{
  #container = null;
  #pointViewComponent = null;
  #editingPointComponent = null;
  #pointsModel = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #changeData = null;
  #changeMode = null;
  #mode = MODE.PREVIEW
  #isNewPoint = false;
  #destinationsModel = null;
  #offersModel = null;

  constructor(pointListContainer, pointsModel, destinationsModel, offersModel, changeData, changeMode){
    this.container = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    const previewPointViewComponent = this.#pointViewComponent;
    const previewEditingPointComponent =  this.#editingPointComponent;

    this.#pointViewComponent = new PointView(point, this.#destinations, this.#offers);
    this.#editingPointComponent = new EditPointView({point: point, destinations: this.#destinations, offers: this.#offers, isNewPoint: this.#isNewPoint});

    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingPointComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointViewComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointViewComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (previewPointViewComponent === null || previewEditingPointComponent === null) {
      render(this.#pointViewComponent, this.container);
      return;
    }

    if (this.#mode === MODE.PREVIEW) {
      replace(this.#pointViewComponent, previewPointViewComponent);
    } else if (this.#mode === MODE.EDITING) {
      replace(this.#editingPointComponent, previewEditingPointComponent);
    }

    remove(previewEditingPointComponent);
    remove(previewPointViewComponent);
  }

  destroy = () => {
    remove(this.#pointViewComponent);
    remove(this.#editingPointComponent);
  };


  #replaceEditFormToPoint = () => {
    replace(this.#pointViewComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.PREVIEW;
  };

  #replacePointToEditForm = () => {
    replace(this.#editingPointComponent, this.#pointViewComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
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
    this.#replacePointToEditForm();
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
    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      USER_ACTIONS.DELETE_POINT,
      UPDATE_TYPES.MINOR,
      point,
    );
  };

  resetView = () => {
    if (this.#mode !== MODE.PREVIEW) {
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };
}
