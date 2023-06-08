import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, marked) => {
  const { name, count } = filter;
  const checkedAttribute = marked ? 'checked' : '';
  const disabledAttribute = count === 0 ? 'disabled' : '';

  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" ${checkedAttribute} value="${name}" ${disabledAttribute}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
