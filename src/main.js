import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/site-filter.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const Task = {
  COUNT: 22,
  COUNT_PER_STEP: 8
};

const tasks = new Array(Task.COUNT).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);


render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
