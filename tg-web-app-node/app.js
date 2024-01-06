const express = require("express");
const cors = require("cors");
const { bot } = require("./src/bot");
const handlers = require("./src/bot/handlers");
const { checkPaymentStatus } = require("./utils/checkPaymentStatus");
require("dotenv").config();

const app = express();

bot.onText(/\/start/, handlers.onStartCommand);

bot.on("callback_query", handlers.onCallbackQuery);

bot.on("message", handlers.onMessage);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/order-tracking", (req, res) => {
  const { chatId, uniqueId } = req.body;
  const interval = 2 * 61 * 1000;

  const intervalId = setInterval(() => {
    checkPaymentStatus(chatId, uniqueId, intervalId);
  }, interval);

  res.send("ok");
});

app.listen(3000, () => {
  console.log(`Сервер запущен по адресу 3000`);
});
