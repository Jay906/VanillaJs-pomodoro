let minutes = 1;
let seconds = 0;
let mode = "pmdr";
let interval;

const main = document.getElementsByTagName("main")[0];
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");
const tasks = document.getElementById("tasks");
const form = document.getElementById("form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const startTimer = () => {
  clearInterval(interval);
  interval = setInterval(startPomodoro, 1000);
};

const stopTimer = () => {
  clearInterval(interval);
};

const resetTimer = () => {
  stopTimer();
  minutes = 25;
  seconds = 0;
  minutesContainer.textContent = "25";
  secondsContainer.textContent = "00";
};

function startPomodoro() {
  if (minutes === 0 && seconds === 0) {
    if (mode === "pmdr") {
      mode = "rest";
      main.classList.add(mode);
      minutes = 5;
      seconds = 0;
      minutesContainer.textContent = "05";
    } else {
      mode = "pmdr";
      main.classList.add(mode);
      minutes = 25;
      seconds = 0;
      minutesContainer.textContent = minutes;
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
  console.log(title_.textContent, desc.textContent);
  const descValue = desc.textContent;
  const titleValue = title_.textContent;
  title.value = titleValue;
  description.value = descValue;
  console.log(parent);
  tasks.removeChild(parent);
};

const remove = (e) => {
  const parent = e.parentElement.parentElement.parentElement;
  tasks.removeChild(parent);
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
form.addEventListener("submit", submitTask);
