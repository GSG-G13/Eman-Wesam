// declare main elements
let theInput = document.querySelector(".add-task input");
let addTaskButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks");
let tasksCount = document.querySelector(".tasks-stats-count .count");
let taskStats = document.querySelector(".task-stats");
let toDoContainer = document.querySelector(".todo-container");
let task = document.querySelector(".task");

// Populate tasks if exist
if (localStorage.getItem("tasks")) {
  populateTasks();
}

function createTaskElement(taskText) {
  // Create task body
  let taskElement = document.createElement("div");
  let content = document.createElement("span");
  let actionsContainer = document.createElement("div");
  let deleteButton = document.createElement("i");
  let editButton = document.createElement("i");

  // Add styles
  taskElement.className = "task";
  content.className = "task-content";
  actionsContainer.className = "actions-container";
  deleteButton.className = "fa-solid fa-trash";
  editButton.className = "fa-solid fa-pen";

  content.innerText = taskText;
  actionsContainer.append(deleteButton, editButton);
  taskElement.append(content, actionsContainer);

  deleteButton.addEventListener("click", function () {
    taskElement.remove();
    checkAndUpdate();
  });

  editButton.addEventListener("click", function () {
    content.setAttribute("contenteditable", true);
    checkAndUpdate();
  });

  tasksContainer.append(taskElement);
  theInput.value = "";
}

function populateTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasksCount.innerText = tasks.length;
  if (tasks.length > 0) {
    tasks.forEach((taskText) => createTaskElement(taskText));
  }
}

addTaskButton.onclick = function () {
  const taskContent = theInput.value;
  createTaskElement(taskContent);
  checkAndUpdate();
};

function checkAndUpdate() {
  // Fetch old tasks from local storage
  const updatedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

  // Gell all tasks from dom
  const tasksContent = [];
  document.querySelectorAll(".tasks .task-content").forEach((element) => {
    tasksContent.push(element.innerText);
  });

  tasksCount.innerText = tasksContent.length;

  // add new tasks to lcocal storage
  localStorage.setItem("tasks", JSON.stringify(tasksContent));
}
