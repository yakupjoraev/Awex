require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const bot = new TelegramBot("6687063743:AAHm6bLFnQbza_iMhW3ZhKFX-gdVTleT0IQ", {
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
                text: "Application",
                web_app: { url: "https://awex-telegram.freeblock.site" },
              },
            ],
          ],
        },
        parse_mode: "HTML",
      });

      await bot.sendMessage(chatId, "Welcome to AWEX B2B Bot", {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Application",
                web_app: { url: "https://awex-telegram.freeblock.site" },
              },
            ],
          ],
        },
        parse_mode: "HTML",
      });
    } catch (err) {
      console.log(err);
    }
  }
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
      bot.sendMessage(channelId, "Оплата прошла успешно!", {
        parse_mode: "HTML",
      });
      clearInterval(intervalId);
    }

    if (response.data.expired) {
      bot.sendMessage(channelId, "Оплата не прошла!", {
        parse_mode: "HTML",
      });
      clearInterval(intervalId);
    }
  } catch (error) {
    console.error("Ошибка при проверке статуса оплаты:", error.message);
  }
}

app.post("/order-tracking", (req, res) => {
  console.log("order-tracking", req.body);
  const { uniqueId } = req.body;
  const chatId = "5516286464";
  const interval = 2 * 60 * 1000;

  const intervalId = setInterval(() => {
    checkPaymentStatus(chatId, uniqueId, intervalId);
  }, interval);

  res.send("ok");
});

app.listen(3000, () => {
  console.log(`Сервер запущен по адресу 3000`);
});
