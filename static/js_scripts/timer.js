document.addEventListener('DOMContentLoaded', () => {
  const timerElement = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Настройки Pomodoro
  const WORK_DURATION = 25 * 60; // 25 минут в секундах
  const BREAK_DURATION = 5 * 60; // 5 минут в секундах

  let timeLeft = WORK_DURATION; // Начинаем с рабочего времени
  let timerInterval;
  let isWorkTime = true; // Флаг для отслеживания текущего режима

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      if (isWorkTime) {
        // Закончилось рабочее время - начинаем перерыв
        alert('Время отдохнуть! 5 минут перерыва');
        isWorkTime = false;
        timeLeft = BREAK_DURATION;
      } else {
        // Закончилось время перерыва - возвращаемся к работе
        alert('Время поработать! 25 минут работы');
        isWorkTime = true;
        timeLeft = WORK_DURATION;
      }

      updateTimer(); // Обновляем отображение таймера
    } else {
      timeLeft--;
    }
  }

  startBtn.addEventListener('click', () => {
    if (!timerInterval && timeLeft > 0) {
      timerInterval = setInterval(updateTimer, 1000);
      // Обновляем текст кнопки при запуске
      startBtn.textContent = 'Работаем...';
    }
  });

  pauseBtn.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      startBtn.textContent = isWorkTime ? 'Продолжить работу' : 'Продолжить перерыв';
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isWorkTime = true; // Сброс в рабочий режим
    timeLeft = WORK_DURATION;
    updateTimer();
    startBtn.textContent = 'Начать работу';
  });

  // Инициализация
  updateTimer();
});
