require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const bot = new TelegramBot("6687063743:AAHm6bLFnQbza_iMhW3ZhKFX-gdVTleT0IQ", {
  polling: true,
});

const app = express();

bot.setChatMenuButton({
  menu_button: {
    type: "web_app",
    text: "Войти в приложение",
    web_app: {
      url: "https://awex-telegram.freeblock.site",
    },
  },
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    try {
      await bot.sendMessage(chatId, "Добро пожаловать в B2B Awex Bot 🤖", {
        // reply_markup: {
        //   inline_keyboard: [
        //     [
        //       {
        //         text: "Application",
        //         web_app: { url: "https://awex-telegram.freeblock.site" },
        //       },
        //     ],
        //   ],
        // },
        parse_mode: "Markdown",
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
      bot.sendMessage(
        channelId,
        `*Счет №${uniqueId}* успешно оплачен ✅
*Название услуги или товара:* ${response.data.name}
*Сумма:* ${
          response?.data?.amount
        } ${response?.data?.paymentData?.currency?.toUpperCase()}

_❗️Прежняя ссылка больше не активна._
      `,
        {
          parse_mode: "Markdown",
        }
      );
      clearInterval(intervalId);
    }

    if (response?.data?.expired) {
      bot.sendMessage(
        channelId,
        `Срок действия счета *№${uniqueId}* истек ❌

_❗️Пожалуйста, выставьте счет повторно._
        `,
        {
          parse_mode: "Markdown",
        }
      );
      clearInterval(intervalId);
    }
  } catch (error) {
    console.error("Ошибка при проверке статуса оплаты:", error.message);
  }
}

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
