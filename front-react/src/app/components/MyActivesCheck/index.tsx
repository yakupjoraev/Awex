export interface MyActivesCheckProps {
  currency: string;
  currencyDesc: string;
  currencyIcon: string;
  balance: number;
  swap: boolean;
  sell: boolean;
  onWithdraw: () => void;
  onSwap: () => void;
  onSell: () => void;
}

export function MyActivesCheck(props: MyActivesCheckProps) {
  return (
    <li className="my-actives__check">
      <div className="my-actives__check-info">
        <div className="my-actives__check-currency">
          <img
            className="my-actives__check-pic"
            src={`/img/actives/${props.currencyIcon}.png`}
            alt=""
          />

          <div className="my-actives__check-name">
            <h4 className="my-actives__check-title">{props.currency}</h4>

            <p className="my-actives__check-detail">{props.currencyDesc}</p>
          </div>
        </div>

        <div className="my-actives__check-sums">
          <h4 className="my-actives__check-title">{props.balance}</h4>

          <p className="my-actives__check-detail">{props.balance}</p>
        </div>
      </div>

      <div className="my-actives__check-operations">
        <div className="my-actives__check-operation ___not_implemented" onClick={() => { alert('Не реализовано') /*props.onWithdraw*/}}>
          <img
            className="my-actives__check-operation-img"
            src="/img/icons/conclusion.svg"
            alt="Вывод"
          />

          <p className="my-actives__check-operation-descr">Вывод</p>
        </div>

        {props.sell && (
          <div className="my-actives__check-operation ___not_implemented" onClick={() => { alert('Не реализовано') /*props.onSell*/}}>
            <img
              className="my-actives__check-operation-img"
              src="/img/icons/sell.svg"
              alt="Продать"
            />

            <p className="my-actives__check-operation-descr">Продать</p>
          </div>
        )}

        {props.swap && (
          <div className="my-actives__check-operation ___not_implemented" onClick={() => { alert('Не реализовано') /*props.onSwap*/}}>
            <img
              className="my-actives__check-operation-img"
              src="/img/icons/swap.svg"
              alt="SWAP"
            />

            <p className="my-actives__check-operation-descr">SWAP</p>
          </div>
        )}
      </div>
    </li>
  );
}
