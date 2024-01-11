const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const logoutBtn = document.querySelector('#logout');

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {  //로그인폼이 제출되면
  event.preventDefault();  //새로고침을 막고
  loginForm.classList.add(HIDDEN_CLASSNAME);  //로그인폼을 숨기고
  logoutBtn.classList.remove(HIDDEN_CLASSNAME); //로그아웃 버튼을 보여준다
  toDoBox.classList.remove(HIDDEN_CLASSNAME);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);  //todo폼을 보여준다
  const username = loginInput.value;  //입력한 유저네임을 변수에 저장하여
  localStorage.setItem(USERNAME_KEY, username);  //로컬스토리지에 저장하고
  paintGreetings(username);  //환영문구를 보여준다
  loginInput.value = '';  //로그아웃 시 이전 이름이 남아있는 것을 방지
}

function paintGreetings(username) {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  if (hours < 12) {  //12시 이전이면
    greeting.innerText = `Good morning, ${username}.`;  //오전 환영문구를 생성하고
  } else {  //12시 이후이면
    greeting.innerText = `Good evening, ${username}.`;  //오후 환영문구를 생성하고
  }
  greeting.classList.remove(HIDDEN_CLASSNAME);  //hidden 클래스를 제거한다
}

function logout() {
  localStorage.removeItem(USERNAME_KEY);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  toDoBox.classList.add(HIDDEN_CLASSNAME);
  logoutBtn.classList.add(HIDDEN_CLASSNAME);
  // 숨길 요소는 hidden 클래스 추가, 보일 요소는 hidden 클래스 삭제
  greeting.innerText = '';
  // h1에 text node값 비워줌.
  deleteAllTodo();
}

loginForm.addEventListener("submit", onLoginSubmit);
logoutBtn.addEventListener('click', logout);
const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername == null) { //저장된 유저네임이 없으면
  loginForm.classList.remove(HIDDEN_CLASSNAME); //로그인폼을 보여주고
  loginForm.addEventListener("submit", onLoginSubmit); //로그인 이벤트를 받는다
} else {  //저장된 유저네임이 있으면
  paintGreetings(savedUsername);  //환영문구를 보여준다
  logoutBtn.classList.remove(HIDDEN_CLASSNAME); //로그아웃 버튼을 보여준다
}