const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Click = require('./models/Click');

const app = express();
const port = 3000;

// Підключення до MongoDB
mongoose.connect('mongodb+srv://Bahdun:root@cluster0.tqg11xz.mongodb.net/', {
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

// Маршрут для зберігання кліків
app.post('/click', async (req, res) => {
  const click = new Click({ count: req.body.count });
  try {
    await click.save();
    res.status(201).send(click);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});