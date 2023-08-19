export function WaitForCrypto() {
  return (
    <div className="payment__wait">
      <div className="payment__wait-header">
        <h1 className="payment__wait-title main-title">
          Ищем транзакцию в сети Blockchain...
        </h1>

        <img className="payment__wait-img" src="/img/icons/loader.svg" alt="" />
      </div>

      <p className="payment__wait-text">Обычно это занимает до 15 минут</p>
    </div>
  );
}
