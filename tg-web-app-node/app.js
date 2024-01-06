require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createInlineKeyboard } = require("./utils/createInlineKeyboard");

let awexToken = "";
let currentPage = 0;
let currencies = [];
let currency = "";

const bot = new TelegramBot("6119167331:AAGzhg57baM-7F_5DPYBEvQBWC5yG7IdxUU", {
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

  if (data.startsWith("next_page_")) {
    const requestedPage = parseInt(data.split("_")[2]);
    if (!isNaN(requestedPage)) {
      currentPage = requestedPage; // Update the currentPage based on the requested page
    }

    const response = await axios.get(
      "https://awex.freeblock.site/api/0.0.1/order/merchant/currencies",
      {
        headers: {
          Authorization: `Bearer ${awexToken}`,
        },
      }
    );

    currencies = response.data.currencies;

    const keyboard = createInlineKeyboard(currencies, currentPage, 40);

    await bot.editMessageText(`Выберите валюту:`, {
      chat_id: chatId,
      message_id: ctx.message.message_id,
      reply_markup: {
        inline_keyboard: keyboard,
      },
      parse_mode: "Markdown",
    });
  }

  if (data.startsWith("prev_page_")) {
    const requestedPage = parseInt(data.split("_")[2]);
    if (!isNaN(requestedPage)) {
      currentPage = requestedPage; // Update the currentPage based on the requested page
    }

    const response = await axios.get(
      "https://awex.freeblock.site/api/0.0.1/order/merchant/currencies",
      {
        headers: {
          Authorization: `Bearer ${awexToken}`,
        },
      }
    );

    currencies = response.data.currencies;

    const keyboard = createInlineKeyboard(currencies, currentPage, 40);

    await bot.editMessageText(`Выберите валюту:`, {
      chat_id: chatId,
      message_id: ctx.message.message_id,
      reply_markup: {
        inline_keyboard: keyboard,
      },
      parse_mode: "Markdown",
    });
  }

  if (data.startsWith("select_currency_")) {
    currency = data.split("_")[2];

    await bot.sendMessage(chatId, `Введите сумму в ${currency.toUpperCase()}`, {
      parse_mode: "Markdown",
    });
  }

  if (data === "create_order") {
    const response = await axios.get(
      "https://awex.freeblock.site/api/0.0.1/order/merchant/currencies",
      {
        headers: {
          Authorization: `Bearer ${awexToken}`,
        },
      }
    );

    currencies = response.data.currencies;

    try {
      const keyboard = createInlineKeyboard(currencies, currentPage, 40);

      await bot.editMessageText(`Выберите валюту:`, {
        chat_id: chatId,
        message_id: ctx.message.message_id,
        reply_markup: {
          inline_keyboard: keyboard,
        },
        parse_mode: "Markdown",
      });
    } catch (err) {
      console.log(err);
    }
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (+text) {
    const response = await axios.post(
      "https://awex.freeblock.site/api/0.0.1/order/invoice",
      {
        name: "Счет выставленный через телеграм бота",
        price: +text,
        currency,
      },
      {
        headers: {
          Authorization: `Bearer ${awexToken}`,
        },
      }
    );

    const { uniqueId } = response.data;

    await bot.sendMessage(
      chatId,
      `*Счет успешно создан* ✅
*Сумма:* ${text} ${currency.toUpperCase()}
*Ссылка для оплаты:* https://awex.freeblock.site/payment/${uniqueId}
      `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Выставить счет",
                callback_data: "create_order",
              },
            ],
          ],
        },
        parse_mode: "Markdown",
      }
    );
  }

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

      awexToken = token;

      await bot.sendMessage(chatId, `Вы успешно авторизовались ✅`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Выставить счет",
                callback_data: "create_order",
              },
            ],
          ],
        },
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
