require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const bot = new TelegramBot("6007178023:AAELLLKz1U_rtZKQULfM1cTL9msOibFM_wA", {
  //6119167331:AAGzhg57baM-7F_5DPYBEvQBWC5yG7IdxUU
  polling: true,
});

const app = express();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    try {
      await bot.sendMessage(
        chatId,
        `Добро пожаловать в B2B Awex Bot 🤖

_Для начала работы нажмите на кнопку Войти и авторизуйтесь в свой Awex аккаунт._`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Войти",
                  callback_data: "login",
                },
              ],
            ],
          },
          parse_mode: "Markdown",
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

bot.on("callback_query", async (ctx) => {
  console.log(ctx);
  const chatId = ctx.message.chat.id;
  const data = ctx.data;

  if (data === "login") {
    try {
      await bot.sendMessage(
        chatId,
        `Для авторизации введите ваш логин и пароль в формате:
*login:password*`,
        {
          parse_mode: "Markdown",
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.includes(":")) {
    const [login, password] = text.split(":");

    try {
      const response = await axios.post(
        "https://awex.freeblock.site/api/0.0.1/account/auth/sign-in",
        {
          email: login,
          password,
        }
      );

      const { token } = response.data;

      const userResponse = await axios.get(
        "https://awex.freeblock.site/api/0.0.1/account/auth/user"
      );

      console.log(token);

      await bot.sendMessage(chatId, `Вы успешно авторизовались ✅`, {
        parse_mode: "Markdown",
      });
    } catch (err) {
      console.log(err.response.data.errors);
      await bot.sendMessage(
        chatId,
        `Ошибка авторизации ❌
Проверьте правильность введенных данных и повторите попытку.`,
        {
          parse_mode: "Markdown",
        }
      );
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
