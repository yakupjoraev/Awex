const { bot } = require("../index");
const { store } = require("../../data");
const { auth } = require("../../services/auth.service");
const { getCurrencies, createInvoice } = require("../../services/awex.service");
const { createInlineKeyboard } = require("../../../utils/createInlineKeyboard");
const { checkPaymentStatus } = require("../../../utils/checkPaymentStatus");

const onStartCommand = async (msg) => {
  const chatId = msg.chat.id;

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
};

const onCallbackQuery = async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "login") {
    try {
      await bot.sendMessage(chatId, `Введите ваш логин:`, {
        parse_mode: "Markdown",
      });

      const prevStoreData = store.get(chatId);
      store.set(chatId, { ...prevStoreData, state: "LOGIN" });
    } catch (err) {
      console.log(err);
    }
  }

  if (data.startsWith("next_page_")) {
    const requestedPage = parseInt(data.split("_")[2]);
    if (!isNaN(requestedPage)) {
      store.set(chatId, {
        ...store.get(chatId),
        currentCurrencyPage: requestedPage,
      }); // Update the currentPage based on the requested page
    }

    const { currencies } = await getCurrencies(chatId);
    const filteredCurrencies = [
      currencies.find((currency) => currency.currency === "usdt"),
      currencies.find((currency) => currency.currency === "usdc"),
      ...currencies,
    ];
    const prevStoreData = store.get(chatId);

    store.set(chatId, { ...prevStoreData, currencies: filteredCurrencies });

    const keyboard = createInlineKeyboard(
      filteredCurrencies,
      requestedPage,
      40
    );

    await bot.editMessageText(`Выберите валюту:`, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: {
        inline_keyboard: keyboard,
      },
      parse_mode: "Markdown",
    });
  }

  if (data.startsWith("prev_page_")) {
    const requestedPage = parseInt(data.split("_")[2]);
    if (!isNaN(requestedPage)) {
      store.set(chatId, {
        ...store.get(chatId),
        currentCurrencyPage: requestedPage,
      }); // Update the currentPage based on the requested page
    }

    const { currencies } = await getCurrencies(chatId);
    const usdtCurrencyId = currencies.findIndex(
      (currency) => currency.currency === "usdt"
    );
    const usdcCurrencyId = currencies.findIndex(
      (currency) => currency.currency === "usdc"
    );

    if (usdtCurrencyId !== -1 && usdcCurrencyId !== -1) {
      currencies.unshift(
        ...currencies.splice(usdtCurrencyId, 1),
        ...currencies.splice(usdcCurrencyId, 1)
      );
    }

    const prevStoreData = store.get(chatId);

    store.set(chatId, { ...prevStoreData, currencies });

    const keyboard = createInlineKeyboard(currencies, requestedPage, 40);

    await bot.editMessageText(`Выберите валюту:`, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: {
        inline_keyboard: keyboard,
      },
      parse_mode: "Markdown",
    });
  }

  if (data.startsWith("select_currency_")) {
    const prevStoreData = store.get(chatId);
    const currency = data.split("_")[2];
    store.set(chatId, { ...prevStoreData, state: "AMOUNT", currency });

    await bot.sendMessage(chatId, `Введите сумму в ${currency.toUpperCase()}`, {
      parse_mode: "Markdown",
    });
  }

  if (data === "create_order") {
    const token = store.get(chatId)?.token;

    if (token) {
      const { currencies } = await getCurrencies(chatId);
      const usdtCurrencyId = currencies.findIndex(
        (currency) => currency.currency === "usdt"
      );
      const usdcCurrencyId = currencies.findIndex(
        (currency) => currency.currency === "usdc"
      );

      if (usdtCurrencyId !== -1 && usdcCurrencyId !== -1) {
        currencies.unshift(
          ...currencies.splice(usdtCurrencyId, 1),
          ...currencies.splice(usdcCurrencyId, 1)
        );
      }

      const prevStoreData = store.get(chatId);

      store.set(chatId, { ...prevStoreData, currencies });

      const currentPage = store.get(chatId).currentCurrencyPage || 0;

      const keyboard = createInlineKeyboard(currencies, currentPage, 40);

      store.set(chatId, { ...prevStoreData, state: "CURRENCY" });

      try {
        await bot.editMessageText(`Выберите валюту:`, {
          chat_id: chatId,
          message_id: query.message.message_id,
          reply_markup: {
            inline_keyboard: keyboard,
          },
          parse_mode: "Markdown",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const prevStoreData = store.get(chatId);
      store.set(chatId, { ...prevStoreData, state: "LOGIN" });
      try {
        await bot.sendMessage(chatId, `Введите ваш логин:`, {
          parse_mode: "Markdown",
        });

        const prevStoreData = store.get(chatId);
        store.set(chatId, { ...prevStoreData, state: "LOGIN" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};

const onMessage = async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const data = store.get(chatId);
  const state = data?.state;

  if (state) {
    switch (state) {
      case "LOGIN": {
        try {
          await bot.sendMessage(chatId, `Введите ваш пароль:`, {
            parse_mode: "Markdown",
          });
          store.set(chatId, { state: "PASSWORD", login: text });
        } catch (err) {
          console.log(err);
        }
        break;
      }
      case "PASSWORD": {
        try {
          store.set(chatId, { ...store.get(chatId), password: text });
          const { token } = await auth(chatId);

          store.delete(chatId);
          store.set(chatId, { state: "AUTH", token });

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
          console.log(err);
          await bot.sendMessage(
            chatId,
            `Ошибка авторизации ❌
Проверьте правильность введенных данных и повторите попытку.`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Повторить попытку",
                      callback_data: "login",
                    },
                  ],
                ],
              },

              parse_mode: "Markdown",
            }
          );
        }
        break;
      }
      case "AMOUNT":
        {
          if (isNaN(text)) {
            await bot.sendMessage(chatId, `Неверный формат суммы ❌`, {
              parse_mode: "Markdown",
            });
            return;
          }

          store.set(chatId, { ...store.get(chatId), amount: text });
          const { uniqueId } = await createInvoice(chatId);
          const currency = store.get(chatId).currency;

          const interval = 2 * 61 * 1000;

          const intervalId = setInterval(() => {
            checkPaymentStatus(chatId, uniqueId, intervalId);
          }, interval);

          store.set(chatId, {
            ...store.get(chatId),
            currentCurrencyPage: 0,
            currency: null,
            amount: null,
            state: "AUTH",
          });

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
        break;
    }
  }
};

module.exports = {
  onStartCommand,
  onMessage,
  onCallbackQuery,
};
