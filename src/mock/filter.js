import {filter} from '../util';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterName, filterTasks]) => ({
      name: filterName,
      count: filterTasks(points).length,
    }),
  );
}

export {generateFilter};

