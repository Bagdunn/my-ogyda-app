document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let energy = 100;
    const scoreElement = document.getElementById('score');
    const energyElement = document.getElementById('energy');
    const clickButton = document.getElementById('click-button');
  
    clickButton.addEventListener('click', async () => {
      if (energy > 0) {
        score++;
        energy--;
        scoreElement.textContent = `Score: ${score}`;
        energyElement.textContent = `Energy: ${energy}`;
  
        try {
          await fetch('/click', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count: score })
          });
        } catch (error) {
          console.error('Error saving click:', error);
        }
      }
    });
  
    setInterval(() => {
      if (energy < 100) {
        energy++;
        energyElement.textContent = `Energy: ${energy}`;
      }
    }, 1000);
  });
  