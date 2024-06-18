document.addEventListener('DOMContentLoaded', function() {
  const birthdateInput = document.getElementById('birthdate');
  const form = document.getElementById('age-form');
  const updateBtn = document.getElementById('update-age-btn');

  if (localStorage.getItem('birthdate')) {
    const storedBirthdate = new Date(localStorage.getItem('birthdate'));
    birthdateInput.value = storedBirthdate.toISOString().substring(0, 10);
    startAgeCounter(storedBirthdate);
    form.style.display = 'none';
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const birthdate = new Date(birthdateInput.value);
    localStorage.setItem('birthdate', birthdate);
    form.style.display = 'none';
    updateBtn.style.display = 'block';
    startAgeCounter(birthdate);
  });

  updateBtn.addEventListener('click', function() {
    form.style.display = 'block';
    updateBtn.style.display = 'none';
  });
});

function startAgeCounter(birthdate) {
  calculateAndDisplayAge(birthdate);
  setInterval(() => calculateAndDisplayAge(birthdate), 10);
}

function calculateAndDisplayAge(birthdate) {
  const now = new Date();
  let years = now.getFullYear() - birthdate.getFullYear();
  let months = now.getMonth() - birthdate.getMonth();
  let days = now.getDate() - birthdate.getDate();
  let hours = now.getHours() - birthdate.getHours();
  let minutes = now.getMinutes() - birthdate.getMinutes();
  let seconds = now.getSeconds() - birthdate.getSeconds();
  let milliseconds = now.getMilliseconds() - birthdate.getMilliseconds();

  if (milliseconds < 0) {
    milliseconds += 1000;
    seconds--;
  }
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById('age-years').textContent = years;
  document.getElementById('age-months').textContent = months;
  document.getElementById('age-days').textContent = days;
  document.getElementById('age-hours').textContent = hours;
  document.getElementById('age-minutes').textContent = minutes;
  document.getElementById('age-seconds').textContent = seconds;
  document.getElementById('age-milliseconds').textContent = milliseconds;
}
