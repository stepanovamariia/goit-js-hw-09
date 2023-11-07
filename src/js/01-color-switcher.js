const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let changeColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStop.disabled = true;

btnStart.addEventListener('click', () => {
  changeColor = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(changeColor);
  btnStart.disabled = false;
  btnStop.disabled = true;
});
