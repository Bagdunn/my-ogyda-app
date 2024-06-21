document.addEventListener('DOMContentLoaded', () => {
  const telegramId = 'YOUR_TELEGRAM_ID'; // замініть на реальний ID
  const clickButton = document.getElementById('click-button');
  const scoreDisplay = document.getElementById('score');
  const energyDisplay = document.getElementById('energy');
  let score = 0;
  let energy = 100;

  // Завантаження даних користувача з сервера
  fetch(`/user/${telegramId}`)
      .then(response => response.json())
      .then(data => {
          score = data.clicks;
          energy = data.energy;
          updateDisplay();
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
      });

  clickButton.addEventListener('click', () => {
      if (energy > 0) {
          score++;
          energy--;
          updateDisplay();
          saveData();
      }
  });

  function updateDisplay() {
      scoreDisplay.textContent = `Score: ${score}`;
      energyDisplay.textContent = `Energy: ${energy}`;
  }

  function saveData() {
      fetch('/click', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegramId, count: score, energy }),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Data saved:', data);
      })
      .catch(error => {
          console.error('Error saving click data:', error);
      });
  }
});