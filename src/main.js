import { render } from './framework/render';
import Trip from './presenter/trip-presenter';
import PointModel from './model/point-model';
import FiltersView from './view/filter-view';
import MenuView from './view/menu-view';
import { getFilter } from './mock/filter.js';
import { getPoints, getDestinations, getOffersType } from './mock/point.js';


const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');

const initApp = async () => {
  const points = await getPoints();
  const offersType = await getOffersType();
  const destinations = await getDestinations();

  const pointsModel = new PointModel();
  pointsModel.init(points, offersType, destinations);

  const boardPresenter = new Trip(
    mainElement.querySelector('.trip-events'),
    pointsModel
  );
  boardPresenter.init();

  const filters = getFilter(pointsModel.points);

  render(new FiltersView({ filters }), headerElement.querySelector('.trip-controls__filters'));
  render(new MenuView(), headerElement.querySelector('.trip-controls__navigation'));
};

initApp();
