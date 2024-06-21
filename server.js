const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Click = require('./models/Click');
const User = require('./models/User');

const app = express();
const port = 3000;

// Підключення до MongoDB
mongoose.connect('mongodb+srv://Bahdun:root@cluster0.tqg11xz.mongodb.net/Ogyda', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Перевірка з'єднання з базою даних
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('Error connecting to MongoDB:', error);
});

// Середовища для парсингу JSON та статичних файлів
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для отримання даних користувача
app.get('/user/:telegramId', async (req, res) => {
  try {
    let user = await User.findOne({ telegramId: req.params.telegramId });
    if (!user) {
      user = new User({ telegramId: req.params.telegramId, clicks: 0, energy: 100 });
      await user.save();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Маршрут для зберігання кліків
app.post('/click', async (req, res) => {
  const { telegramId, count, energy } = req.body;
  console.log(`Received click data: telegramId=${telegramId}, count=${count}, energy=${energy}`);
  try {
    let user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.clicks = count;
    user.energy = energy;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log('Error saving clicks:', error);
    res.status(400).send(error);
  }
});

// Встановлення порту
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});