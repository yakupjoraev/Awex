function createInlineKeyboard(currencies, currentPage, itemsPerPage) {
  const chunkedCurrencies = [];
  for (let i = 0; i < currencies.length; i += itemsPerPage) {
    chunkedCurrencies.push(currencies.slice(i, i + itemsPerPage));
  }

  const currentPageCurrencies = chunkedCurrencies[currentPage];

  const currencyButtons = [];

  for (let i = 0; i < currentPageCurrencies.length; i += 6) {
    currencyButtons.push(currentPageCurrencies.slice(i, i + 6));
  }

  const keyboardRows = currencyButtons.map((currencyRow) =>
    currencyRow.map((currency) => ({
      text: currency.currency.toUpperCase(),
      callback_data: `select_currency_${currency.currency}`,
    }))
  );

  const paginationButtons = [];

  if (currentPage > 0) {
    paginationButtons.push({
      text: "Назад",
      callback_data: `prev_page_${currentPage - 1}`,
    });
  }

  paginationButtons.push({
    text: "Ещё",
    callback_data: `next_page_${currentPage + 1}`,
  });

  keyboardRows.push(paginationButtons);

  return keyboardRows;
}

module.exports = { createInlineKeyboard };
