import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input[id="datetime-picker"]');
const startBtn = document.querySelector('button[type="button"]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
let timerId;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        timerId = setInterval(() => {
          const targetDate = selectedDate.getTime();
          const currentDate = new Date().getTime();
          const timeRemaining = targetDate - currentDate;

          if (timeRemaining <= 0) {
            clearInterval(timerId);
            startBtn.disabled = true;
          } else {
            startBtn.disabled = true;

            const time = convertMs(timeRemaining);
            const addPadStart = addLeadingZero(time);

            daysEl.textContent = addPadStart[0];
            hoursEl.textContent = addPadStart[1];
            minutesEl.textContent = addPadStart[2];
            secondsEl.textContent = addPadStart[3];
          }
        }, 1000);
      });
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return Object.values(value).map(el => el.toString().padStart(2, '0'));
}
