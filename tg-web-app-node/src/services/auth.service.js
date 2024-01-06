const axios = require("axios");
const { store } = require("../data");

const auth = async (chatId) => {
  const response = await axios.post(
    "https://awex.freeblock.site/api/0.0.1/account/auth/sign-in",
    {
      email: store.get(chatId).login,
      password: store.get(chatId).password,
    }
  );

  return response.data;
};

module.exports = {
  auth,
};
