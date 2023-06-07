import { render, RenderPosition } from './framework/render';
import Trip from './presenter/trip-presenter';
import PointModel from './model/point-model';
import FiltersView from './view/filter-view';
import InfoView from './view/info-view';
import MenuView from './view/menu-view';

const pointsModel = new PointModel();
const tripPresenter = new Trip(document.querySelector('.trip-events'), pointsModel);

render(new MenuView(), document.querySelector('.trip-controls__navigation'));
render(new FiltersView(pointsModel.points), document.querySelector('.trip-controls__filters'));
render(new InfoView(pointsModel.points, pointsModel.destinations), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);

tripPresenter.init(pointsModel);
