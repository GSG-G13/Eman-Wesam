// declare main elements
let theInput = document.querySelector(".add-task input");
let plusButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let taskStats = document.querySelector(".task-stats");
let toDoContainer = document.querySelector(".todo-container");
let task = document.querySelector(".task");

// if localStorage is exist ,get values from localStorage and creat Boxes from the values
if (localStorage.getItem("task")) {
  // get values from localStorage
  let arrayWes = JSON.parse(localStorage.getItem("task"));
  console.log(arrayWes);
  // loop at values
  for (let i = 0; i < arrayWes.length; i++) {
    // creating boxes by values
    console.log(arrayWes[i]);
    let mainContainer = document.createElement("div");
    let mainSpan = document.createElement("span");
    let icons = document.createElement("div");
    let trashIcon = document.createElement("i");
    let editIcon = document.createElement("i");
    // get the value from arrayWes
    let text = document.createTextNode(arrayWes[i]);
    mainSpan.append(text);
    mainContainer.className = "tasks-content";
    mainSpan.className = "no-tasks-message";
    icons.className = "icons";
    trashIcon.className = "fa-solid fa-trash delete";
    editIcon.className = "fa-solid fa-pen edit";
    mainContainer.append(mainSpan);
    icons.append(trashIcon);
    icons.append(editIcon);
    mainContainer.append(icons);
    task.append(mainContainer);
    console.log(trashIcon);
    countTasks();
    //delete task
    trashIcon.addEventListener("click", function () {
      mainContainer.remove();

      //check
      checkAndRestore();
      countTasks();
    });
    //edit task
    editIcon.addEventListener("click", function () {
      mainSpan.setAttribute("contenteditable", true);

      //check
      checkAndRestore();
    });
  }
}
//
//when you click add
plusButton.onclick = function () {
  let mainContainer = document.createElement("div");
  let mainSpan = document.createElement("span");
  let icons = document.createElement("div");
  let trashIcon = document.createElement("i");
  let editIcon = document.createElement("i");
  let text = document.createTextNode(theInput.value);
  mainSpan.append(text);
  mainContainer.className = "tasks-content";
  mainSpan.className = "no-tasks-message";
  icons.className = "icons";
  trashIcon.classList = "fa-solid fa-trash delete";
  editIcon.classList = "fa-solid fa-pen edit";
  mainContainer.append(mainSpan);
  icons.append(trashIcon);
  icons.append(editIcon);
  mainContainer.append(icons);
  task.append(mainContainer);
  console.log(trashIcon);
  theInput.value = "";

  //delete task
  trashIcon.addEventListener("click", function () {
    mainContainer.remove();

    //check
    checkAndRestore();
    countTasks();
  });
  //edit task
  editIcon.addEventListener("click", function () {
    mainSpan.setAttribute("contenteditable", true);

    //check
    checkAndRestore();
  });
  //
  checkAndRestore();
  countTasks();
};

//count of tasks in documentation
function countTasks() {
  let countSpan = document.querySelector(".count-span");
  countSpan.innerHTML = document.querySelectorAll(
    ".task .tasks-content"
  ).length;
}
//
//loop in documantaion and (get values in array) ,and save this array in LocalStorage
function checkAndRestore() {
  // make array from spans
  let arrCount = Array.from(document.querySelectorAll(".tasks-content span"));

  let emValues = [];
  // loop at spans
  arrCount.forEach((span) => {
    //restore every value in the array (emValues)
    emValues.push(span.innerHTML);

    console.log(emValues);
  });

  //sending the array (emValues) to localStorage
  localStorage.setItem("task", JSON.stringify(emValues));
}
