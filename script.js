const todosList = document.getElementById("todo__container");
const input = document.getElementById("todo");
const button = document.getElementById("btn-submit");
const form = document.getElementById("form");
const completedTasks = document.getElementById("span1");
const remainingTasks = document.getElementById("span2");
const totalTasks = document.getElementById("span3");
const checkboxbtn = document.querySelectorAll(".todo-checkbox");

let todoArr = [];

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then((response) => response.json())
    .then((json) => {
      // json.map((item) => {
      //   todoArr.push(item);
      // });
      todoArr = json;
      renderData(json);
    });
}
fetchData();

// function checkTodos(val) {
//   let bool = 'false';
//   val === true ? (bool = 'COMPLETED') : (bool = 'UNCOMPLETED');
//   return bool;
// }

let list;

function renderData(json) {
  list = json
    // .slice(191)
    .map(
      (todo, index) =>
        `<li class="todo" id="${todo.id}">
        <div class="todo-first">
          <input type="checkbox" ${
            todo.completed && "checked"
          } onclick="handleClick(${index})" class="todo-checkbox">
          <p class="task">${todo.title}</p>
          </div>
          <button class="button remove-task">X</button>
      </li>`
    )
    .reverse()
    .join("");

  todosList.innerHTML = list;
  countTasks();
}

function displayCompleted() {
  let completedTodo = todoArr.filter((todo) => todo.completed === true);
  renderData(completedTodo);
}

function displayRemaining() {
  let remainingTodo = todoArr.filter((todo) => todo.completed === false);
  renderData(remainingTodo);
}

function displayTotal() {
  renderData(todoArr);
}

let data;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  data = {
    title: input.value,
    completed: false,
    userId: 11,
    id: todoArr.length + 1,
  };

  if (input.value === "") {
    alert("Task cannot be blank");
  } else {
    postData(data);
  }

  input.value = "";
});

function postData(data) {
  todoArr.push(data);
  renderData(todoArr);
  countTasks();
}

// function to remove a task
todosList.addEventListener("click", (el) => {
  if (
    el.target.classList.contains("remove-task") ||
    el.target.parentElement.classList.contains("remove-task")
  ) {
    const taskId = el.target.closest("li").id;
    removeTask(taskId);
  }
});

// function to remove a task
function removeTask(taskId) {
  todoArr = todoArr.filter((task) => task.id !== parseInt(taskId));
  document.getElementById(taskId).remove();
  countTasks();
}

// function to count tasks
function countTasks() {
  totalTasks.textContent = todoArr.length;
  const completedTasksArray = todoArr.filter((task) => task.completed === true);
  completedTasks.textContent = completedTasksArray.length;

  remainingTasks.textContent = todoArr.length - completedTasksArray.length;
}

function handleClick(e) {
  console.log(todoArr[e]);

  if (todoArr[e].completed === true) {
    todoArr[e].completed = false;
  } else if (todoArr[e].completed === false) {
    todoArr[e].completed = true;
  }
  // todoArr[e].completed = !todoArr[e].completed;

  countTasks();
}
