const TelegramBot = require('node-telegram-bot-api');
const token = '7308340485:AAG0xKfeFRcIeWsD8EM7sl4XUpgyM3rc4gg';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Game',
            web_app: { url: 'https://my-ogyda-app-8b8290897b42.herokuapp.com' } // Замініть на URL вашої гри
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Click the button below to start the game!', opts);
});