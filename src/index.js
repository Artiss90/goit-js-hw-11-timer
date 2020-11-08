// import { Theme } from './js/task';
import './styles.css';
// import BSN from 'bootstrap.native';





const refs = {
  timer: document.querySelector('#timer-1'),
};

const forthcomingDate = new Date('2021,01,01,00:00:00');

class CountdownTimer{
  constructor( {selector,
  targetDate}) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.getCountdown();
  }

  getCountdown() {
    setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      const countdown = this.getTimeComponents(deltaTime);
      this.writeCountdown(countdown)
    }, 1000)
  }

  writeCountdown({days, hours, mins, secs}) {
      this.selector.querySelector('[data-value="days"]').textContent = `${days}`,
      this.selector.querySelector('[data-value="hours"]').textContent =`${hours}`,
      this.selector.querySelector('[data-value="mins"]').textContent = `${mins}`,
      this.selector.querySelector('[data-value="secs"]').textContent = `${secs}`
  }

  getTimeComponents(time) {
/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days,hours, mins, secs };
}

  /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
pad(value) {
    return String(value).padStart(2, '0');
}
}


const timer = new CountdownTimer({
  selector: refs.timer,
  targetDate: forthcomingDate
});