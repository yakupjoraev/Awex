require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

const app = express();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    try {
      await bot.sendMessage(chatId, "Welcome to AWEX B2B Bot", {
        reply_markup: {
          inline_keyboard: [[{ text: "web app", web_app: { url: webAppUrl } }]],
        },
      });

      await bot.sendMessage(chatId, "Welcome to AWEX B2B Bot", {
        reply_markup: {
          keyboard: [[{ text: "web app", web_app: { url: webAppUrl } }]],
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  console.log({ text });
});

app.use(express.json());

async function checkPaymentStatus(channelId, uniqueId, intervalId) {
  try {
    const response = await axios.get(
      `https://awex.freeblock.site/api/0.0.1/order/payment/${uniqueId}`
    );
    const paymentStatus = response.data.paid;

    if (paymentStatus) {
      bot.sendMessage(channelId, "Оплата прошла успешно!");
      clearInterval(intervalId);
    }

    if (response.data.expired) {
      clearInterval(intervalId);
    }
  } catch (error) {
    console.error("Ошибка при проверке статуса оплаты:", error.message);
  }
}

app.post("/order-tracking", (req, res) => {
  const { chatId, uniqueId } = req.body;
  const interval = 2 * 60 * 1000;

  const intervalId = setInterval(() => {
    checkPaymentStatus(chatId, uniqueId, intervalId);
  }, interval);

  res.send("ok");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
