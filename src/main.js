import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/site-filter.js";
import TaskView from "./view/task.js";
import TaskEditView from "./view/edit-task.js";
import LoadMoreButtonView from "./view/load-button.js";
import BoardView from "./view/site-board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const Task = {
  COUNT: 22,
  COUNT_PER_STEP: 8
}

const tasks = new Array(Task.COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};


render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(tasks.length, Task.COUNT_PER_STEP); i++) {
  renderTask(taskListComponent.getElement(), tasks[i]);
}

if (tasks.length > Task.COUNT_PER_STEP) {
  let renderedTaskCount = Task.COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + Task.COUNT_PER_STEP)
    .forEach((task) => renderTask(taskListComponent.getElement(), task));

    renderedTaskCount += Task.COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
