require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const bot = new TelegramBot("6119167331:AAGzhg57baM-7F_5DPYBEvQBWC5yG7IdxUU", {
  polling: true,
});

const app = express();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    try {
      await bot.sendMessage(chatId, "Welcome to AWEX B2B Bot", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "web app",
                web_app: { url: "https://awex-telegram.freeblock.site/" },
              },
            ],
          ],
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
app.use(
  cors({
    origin: "*",
  })
);

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
  console.log("order-tracking", req.body);
  const { chatId, uniqueId } = req.body;
  const interval = 2 * 60 * 1000;

  const intervalId = setInterval(() => {
    checkPaymentStatus(chatId, uniqueId, intervalId);
  }, interval);

  res.send("ok");
});

app.listen(3000, () => {
  console.log(`Сервер запущен по адресу 3000`);
});
