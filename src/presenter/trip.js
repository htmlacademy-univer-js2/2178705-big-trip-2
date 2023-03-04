import {render, RenderPosition} from '../render';
import PointCreateView from '../view/point-create-view';
import EditPointView from '../view/edit-point-view';
import SortView from '../view/sort-view';
import ListPointsView from '../view/list-points-view';
import PointView from '../view/point-view';

export default class Trip {
  constructor({container}) {
    this.component = new ListPointsView();
    this.container = container;
  }

  init() {
    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointCreateView(), this.container, RenderPosition.BEFOREEND);
    render(new EditPointView(), this.container, RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.container, RenderPosition.BEFOREEND);
    }
  }
}
