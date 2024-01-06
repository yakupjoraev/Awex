const TelegramBot = require("node-telegram-bot-api");
const config = require("../../config");

const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

module.exports = { bot };
