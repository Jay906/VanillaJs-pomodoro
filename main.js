const main = document.getElementsByTagName("main")[0];
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");
const tasks = document.getElementById("tasks");
const form = document.getElementById("task-form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const settings = document.getElementById("settings");
const box = document.getElementById("box-wrapper");
const settingsForm = document.getElementById("settings-form");
const work = document.getElementById("work");
const rest = document.getElementById("rest");
const next = document.getElementById("next");

let workTime = Number(work.value) || 25;
let restTime = Number(rest.value) || 5;
let minutes = 0;
let seconds = 0;
let mode = "pmdr";
let interval;

const stopTimer = () => {
  clearInterval(interval);
};

const startTimer = () => {
  stopTimer();
  interval = setInterval(startPomodoro, 1000);
};

const resetTimer = () => {
  stopTimer();
  if (mode === "pmdr") {
    minutes = workTime;
  } else {
    minutes = restTime;
  }
  seconds = 0;
  minutesContainer.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsContainer.textContent = seconds < 10 ? `0${seconds}` : seconds;
};

function startPomodoro() {
  if (minutes === 0 && seconds === 0) {
    if (mode === "pmdr") {
      minutes = workTime;
    } else {
      minutes = restTime;
    }
  }
  if (seconds === 0) {
    minutes--;
    seconds = 60;
  }
  seconds--;
  secondsContainer.textContent = seconds < 10 ? `0${seconds}` : seconds;
  minutesContainer.textContent = minutes < 10 ? `0${minutes}` : minutes;
}

const submitTask = (e) => {
  e.preventDefault();
  const titleValue = title.value.trim();
  const descValue = description.value.trim();
  if (!titleValue || !descValue) {
    return console.error("fields must contain at least one character");
  }

  const task = `
    <article class="task">
      <section>${titleValue}</section>
      <section>${descValue}</section>
      <section class="task-buttons">
        <button class="button" onclick="ellipsisToggle(this)">
          <i class="fa fa-ellipsis-v"></i>
        </button>
        <div class="options">
          <p id="edit" onclick="edit(this)">Edit</p>
          <p id="remove" onclick="remove(this)">Remove</p>
        </div>
      </section>
    </article>
  `;

  tasks.insertAdjacentHTML("beforeend", task);
  title.value = "";
  description.value = "";
};

const ellipsisToggle = (e) => {
  const target = e.nextElementSibling;
  if (target.classList.contains("show-options")) {
    target.classList.remove("show-options");
  } else {
    target.classList.add("show-options");
  }
};

const edit = (e) => {
  const desc = e.parentElement.parentElement.previousElementSibling;
  const title_ = desc.previousElementSibling;
  const parent = desc.parentElement;
  const descValue = desc.textContent;
  const titleValue = title_.textContent;
  title.value = titleValue;
  description.value = descValue;
  title.focus();
  tasks.removeChild(parent);
};

const remove = (e) => {
  const parent = e.parentElement.parentElement.parentElement;
  tasks.removeChild(parent);
};

const seeSettings = () => {
  box.classList.add("show");
  settingsForm.classList.add("show");
  window.addEventListener("click", (e) => {
    if (e.target.id === "box-wrapper" || e.target.id === "x") {
      box.classList.remove("show");
      settingsForm.classList.remove("show");
    }
  });
};

const saveSettings = (e) => {
  e.preventDefault();
  if (!work.value || !rest.value) {
    return;
  }
  workTime = Number(work.value);
  restTime = Number(rest.value);
  minutes = workTime;
  seconds = 0;
  minutesContainer.textContent = minutes < 10 ? `0${workTime}` : workTime;
  secondsContainer.textContent = seconds < 10 ? `0${seconds}` : seconds;
  box.classList.remove("show");
  settingsForm.classList.remove("show");
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
form.addEventListener("submit", submitTask);
settings.addEventListener("click", seeSettings);
settingsForm.addEventListener("submit", saveSettings);
