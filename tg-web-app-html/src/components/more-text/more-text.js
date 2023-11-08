function moreText() {
  const container = document.querySelector('[data-more-wrapper]');

  if (!container) {
    return null
  }

  const toggleButton = container.querySelector("[data-more-btn]");
  const textBlock = container.querySelector("[data-more-text]");

  container.addEventListener("click", function () {
    this.classList.toggle("more");
    textBlock.classList.toggle("more");

    if (textBlock) {
      if (textBlock.classList.contains("more")) {
        toggleButton.textContent = "Свернуть";
      } else {
        toggleButton.textContent = "Читать далее";
      }
    }
  });
}

moreText();