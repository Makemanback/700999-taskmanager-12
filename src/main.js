import SiteMenuView from "./view/site-menu.js";

import {generateTask} from "./mock/task.js";
import FilterModel from "./model/filter.js";
import BoardPresenter from "./presenter/board.js";
import TasksModel from "./model/tasks.js";
import {render, RenderPosition} from "./utils/render.js";

import FilterPresenter from "./presenter/filter.js";


const Task = {
  COUNT: 22,
  COUNT_PER_STEP: 8
};

const tasks = new Array(Task.COUNT).fill(``).map(generateTask);


const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();

boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
