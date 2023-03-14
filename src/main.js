import { render, RenderPosition } from './render';
import FilterView from './view/filter-view';
import Trip from './presenter/trip';
import PointModel from './model/point-model';
import { createPoints  } from './mock/point';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});
const pointModel = new PointModel();


render(new FilterView(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init(pointModel);
