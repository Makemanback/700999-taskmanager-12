import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/site-filter.js";
import {generateTask} from "./mock/task.js";
import FilterModel from "./model/filter.js";
import BoardPresenter from "./presenter/board.js";
import TasksModel from "./model/tasks.js";
import {render, RenderPosition} from "./utils/render.js";

const Task = {
  COUNT: 22,
  COUNT_PER_STEP: 8
};

const filters = [
  {
    type: `all`,
    name: `ALL`,
    count: 0
  }
];

const tasks = new Array(Task.COUNT).fill(``).map(generateTask);


const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);


render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters, `all`), RenderPosition.BEFOREEND);

boardPresenter.init();
