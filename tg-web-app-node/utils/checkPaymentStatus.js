const { getPaymentStatus } = require("../src/services/awex.service");

async function checkPaymentStatus(channelId, uniqueId, intervalId) {
  try {
    const { paid, expired } = await getPaymentStatus(uniqueId);

    if (paid) {
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

    if (expired) {
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

module.exports = {
  checkPaymentStatus,
};
