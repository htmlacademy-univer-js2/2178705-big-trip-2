import {render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {MODE} from '../const';

export default class PointPresenter {
  #previewPointComponent = null;
  #editingPointComponent = null;
  #pointListContainer = null;
  #pointsModel = null;
  #destinations = null;
  #changeData = null;
  #changeMode = null;
  #offers = null;
  #point = null;
  #mode = MODE.PREVIEW;

  constructor(pointListContainer, pointsModel, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    const previousPreviewPointComponent = this.#previewPointComponent;
    const previousEditingPointComponent = this.#editingPointComponent;

    this.#editingPointComponent = new EditPointView(point, this.#destinations, this.#offers);
    this.#previewPointComponent = new PointView(point, this.#destinations, this.#offers);

    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);

    if (previousPreviewPointComponent === null) {
      render(this.#previewPointComponent, this.#pointListContainer);
      return;
    } else if (previousEditingPointComponent === null) {
      render(this.#previewPointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === MODE.PREVIEW) {
      replace(this.#previewPointComponent, previousPreviewPointComponent);
    } else if (this.#mode === MODE.EDITING) {
      replace(this.#editingPointComponent, previousEditingPointComponent);
    }

    remove(previousPreviewPointComponent);
    remove(previousEditingPointComponent);
  }

  #replacePreviewPoint = () => {
    replace(this.#editingPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #replaceEditingPoint = () => {
    replace(this.#previewPointComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.PREVIEW;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPoint();
    }
  };

  #handlePreviewClick = () => {
    this.#editingPointComponent.reset(this.#point);
    this.#replaceEditingPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditingPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePreviewPoint();
  };

  destroy = () => {
    remove(this.#previewPointComponent);
    remove(this.#editingPointComponent);
  };

  resetView = () => {
    if (this.#mode !== MODE.PREVIEW) {
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPoint();
    }
  };
}

