

export function DepositInfo() {

    return (
        <div className="deposits__infos">
          <div className="deposits__info deposits__info--black">
            <div className="deposits__info-row">
              <div className="deposits__info-name">Заявки на возврат:</div>
              <div className="deposits__info-count deposits__info-count--red">
                50
              </div>
            </div>

            <div className="deposits__info-row">
              <div className="deposits__info-label">На сумму:</div>
              <div className="deposits__info-sum">500.000</div>
            </div>
          </div>

          <div className="deposits__info">
            <div className="deposits__info-row">
              <div className="deposits__info-name">Активные депозиты:</div>
              <div className="deposits__info-count">350</div>
            </div>

            <div className="deposits__info-row">
              <div className="deposits__info-label">На сумму:</div>
              <div className="deposits__info-sum">1.789.567.57</div>
            </div>
          </div>

          <div className="deposits__info">
            <div className="deposits__info-row">
              <div className="deposits__info-name">На проверке:</div>
              <div className="deposits__info-count">50</div>
            </div>
          </div>
        </div>
    )
}