import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/site-filter.js";
// import TaskView from "./view/task.js";
// import TaskEditView from "./view/edit-task.js";
// import LoadMoreButtonView from "./view/load-button.js";
// import BoardView from "./view/site-board.js";
// import SortView from "./view/sort.js";
// import TaskListView from "./view/task-list.js";
// import NoTaskView from "./view/no-task.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
// import {render, RenderPosition, replace, remove} from "./utils/render.js";

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

// const renderTask = (taskListElement, task) => {
//   const taskComponent = new TaskView(task);
//   const taskEditComponent = new TaskEditView(task);

//   const replaceCardToForm = () => {
//     replace(taskEditComponent, taskComponent);
//   };

//   const replaceFormToCard = () => {
//     replace(taskComponent, taskEditComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       replaceFormToCard();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   taskComponent.setEditClickHandler(() => {
//     replaceCardToForm();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   taskEditComponent.setFormSubmitHandler(() => {
//     evt.preventDefault();
//     replaceFormToCard();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
// };

// const renderBoard = (boardContainer, boardTasks) => {
//   const boardComponent = new BoardView();
//   const taskListComponent = new TaskListView();

//   render(boardContainer, boardComponent, RenderPosition.BEFOREEND);
//   render(boardComponent, taskListComponent, RenderPosition.BEFOREEND);

//   if (boardTasks.every((task) => task.isArchive)) {
//     render(boardComponent, new NoTaskView(), RenderPosition.AFTERBEGIN);
//     return;
//   }

//   render(boardComponent, new SortView(), RenderPosition.AFTERBEGIN);

//   boardTasks
//     .slice(0, Math.min(tasks.length, Task.COUNT_PER_STEP))
//     .forEach((boardTask) => renderTask(taskListComponent, boardTask));

//   if (boardTasks.length > Task.COUNT_PER_STEP) {
//     let renderedTaskCount = Task.COUNT_PER_STEP;

//     const loadMoreButtonComponent = new LoadMoreButtonView();

//     render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

//     loadMoreButtonComponent.setClickHandler(() => {
//       boardTasks
//         .slice(renderedTaskCount, renderedTaskCount + Task.COUNT_PER_STEP)
//         .forEach((boardTask) => renderTask(taskListComponent, boardTask));

//       renderedTaskCount += Task.COUNT_PER_STEP;

//       if (renderedTaskCount >= boardTasks.length) {
//         remove(loadMoreButtonComponent);
//       }
//     });
//   }
// };

const boardPresenter = new BoardPresenter(siteMainElement);


render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

// renderBoard(siteMainElement, tasks);
boardPresenter.init(tasks);
