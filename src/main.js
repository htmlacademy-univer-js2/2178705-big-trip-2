import { render, RenderPosition } from './framework/render';
import FilterView from './view/filter-view';
import Trip from './presenter/trip';
import MenuView from './view/menu-view';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});
const menuContainer = document.querySelector('.trip-controls__navigation');

render(new FilterView(), filterContainer, RenderPosition.BEFOREEND);
render(new MenuView(), menuContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
