const toDoBox = document.querySelector("#todo-box");
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const deleteAllBtn = document.querySelector('#del-all__btn');

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  console.log(li.id);
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = `📌 ${newTodoObj.text}`;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function deleteAllTodo() {
  toDos = [];
  saveToDos();
  toDoList.textContent = '';
}

deleteAllBtn.addEventListener('click', deleteAllTodo);
toDoForm.addEventListener("submit", handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedUsername == null) {  //저장된 유저네임이 없으면
  toDoForm.classList.add(HIDDEN_CLASSNAME);  //todo폼을 숨기고
  loginForm.addEventListener("submit", onLoginSubmit);  //로그인 이벤트를 받는다
} else {  //저장된 유저네임이 있으면
  toDoBox.classList.remove(HIDDEN_CLASSNAME);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);  //todo폼을 보여준다
  if (savedToDos != null) {  //저장된 todo가 없으면
    const parsedToDos = JSON.parse(savedToDos);
    parsedToDos.forEach((item) => console.log("this is the turn of ", item));
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
}