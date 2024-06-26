document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    const telegramId = tg.initDataUnsafe.user.id;
  const clickButton = document.getElementById('click-button');
  const scoreDisplay = document.getElementById('score');
  const energyDisplay = document.getElementById('energy');
  let score = 0;
  let energy = 100;

  // Завантаження даних користувача з сервера
  fetch(`/user/${telegramId}`)
      .then(response => response.json())
      .then(data => {
          console.log('User data:', data);
          score = data.clicks || 0;
          energy = data.energy || 100;
          updateDisplay();
          startEnergyRegeneration();
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

  function startEnergyRegeneration() {
    setInterval(() => {
        if (energy < 100) {
            energy++;
            updateDisplay();
            saveData();
        }
    }, 2000); // Поповнення енергії кожні 2 секунди
    }

});