import { render, RenderPosition } from './framework/render';
import FilterView from './view/filter-view';
import Trip from './presenter/trip';
import MenuView from './view/menu-view';
import PointModel from './model/point-model';
import { generateFilter } from './mock/filter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');

const pointsModel = new PointModel();
const filters = generateFilter(pointsModel.points);
render(new FilterView(filters), filterContainer);
const tripPresenter = new Trip({container: tripContainer}, pointsModel);
render(new MenuView(), menuContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
