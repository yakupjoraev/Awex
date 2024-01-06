const axios = require("axios");
const { store } = require("../data");

const getCurrencies = async (chatId) => {
  const response = await axios.get(
    "https://awex.freeblock.site/api/0.0.1/order/merchant/currencies",
    {
      headers: {
        Authorization: `Bearer ${store.get(chatId)?.token}`,
      },
    }
  );

  return response.data;
};

const createInvoice = async (chatId) => {
  const response = await axios.post(
    "https://awex.freeblock.site/api/0.0.1/order/invoice",
    {
      name: "Счет выставленный через телеграм бота",
      price: store.get(chatId)?.amount,
      currency: store.get(chatId)?.currency,
    },
    {
      headers: {
        Authorization: `Bearer ${store.get(chatId).token}`,
      },
    }
  );

  return response.data;
};

const getPaymentStatus = async (uniqueId) => {
  const response = await axios.get(
    `https://awex.freeblock.site/api/0.0.1/order/payment/${uniqueId}`
  );

  return response.data;
};

module.exports = {
  getCurrencies,
  createInvoice,
  getPaymentStatus,
};
