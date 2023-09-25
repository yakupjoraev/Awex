import { ProfileData } from "@awex-api";
import classNames from "classnames";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export interface MerchantItemProps {
  merchantId: string;
  profileData?: ProfileData;
}

export function MerchantItem(props: MerchantItemProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandBtnClick = () => {
    setExpanded(!expanded);
  };

  const handleСopied = () => {
    toast.success("Скопировано!");
  };

  return (
    <div
      className={classNames("admin-marchants__item", { active: expanded })}
      data-marchants-item=""
    >
      <div className="admin-marchants__item-header">
        <div className="admin-marchants__item-id">
          {`ID${props.merchantId}`}
          <p className="admin-marchants__item-id-descr">
            Merchant’s name Second Name and smth
          </p>
        </div>
        <div className="admin-marchants__item-data">10/01/23</div>
        <div className="admin-marchants__item-comission">0.1%</div>
        <div className="admin-marchants__item-action">
          <button type="button" className="admin-marchants__item-action-btn">
            <img src="/img/icons/lock.svg" alt="lock" />
          </button>
          <button type="button" className="admin-marchants__item-action-btn">
            <img src="/img/icons/pen.svg" alt="pen" />
          </button>
          <button type="button" className="admin-marchants__item-action-btn">
            <img src="/img/icons/trash.svg" alt="trash" />
          </button>
        </div>
        <div className="admin-marchants__item-statistic">
          <img src="/img/icons/chart-pie.svg" alt="chart-pie" />
          Статистика мерчанта
        </div>
        <div
          className="admin-marchants__item-btn"
          onClick={handleExpandBtnClick}
        >
          <span>{expanded ? "Скрыть" : "Подробнее"}</span>
          <img src="/img/icons/arrow-down.svg" alt="" />
        </div>
      </div>
      <div className="admin-marchants__item-content">
        <div className="admin-marchants__item-blocks">
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">
              Название организации
            </p>
            <p className="admin-marchants__item-block-text">
              {props.profileData?.companyName}
            </p>
            {renderCopyToClipboardBtn(
              props.profileData?.companyName,
              handleСopied
            )}
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">ИНН организации</p>
            <p className="admin-marchants__item-block-text">...</p>
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">Юрисдикция</p>
            <p className="admin-marchants__item-block-text">...</p>
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">Юр. адрес</p>
            <p className="admin-marchants__item-block-text">
              {props.profileData?.legalAddress}
            </p>
            {renderCopyToClipboardBtn(
              props.profileData?.legalAddress,
              handleСopied
            )}
          </div>
          <div className="admin-marchants__item-blocks">
            <div className="admin-marchants__item-block">
              <p className="admin-marchants__item-block-label">Телефон</p>
              <p className="admin-marchants__item-block-text">...</p>
            </div>
            <div className="admin-marchants__item-block">
              <p className="admin-marchants__item-block-label">Сайт</p>
              <p className="admin-marchants__item-block-text">...</p>
            </div>
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">Расчетный счет</p>
            <p className="admin-marchants__item-block-text">...</p>
          </div>
        </div>
        <div className="admin-applications__others">
          <div className="my-projects__items-wrapper">
            <ul className="my-projects__items">
              <li className="my-projects__item">
                <div className="my-projects__item-info">
                  <h3 className="my-projects__item-title main-title">
                    ООО ”Второй”
                  </h3>
                  <a href="#" className="my-projects__item-address">
                    https://www.gemini.com/
                  </a>
                </div>
                <div className="my-projects__item-convertion my-projects__item-convertion--row">
                  <div className="my-projects__item-for">
                    <div className="my-projects__item-text">конвертация в:</div>
                    <div className="my-projects__item-currency">
                      <img
                        className="my-projects__item-pic"
                        src="/img/actives/actives-1.png"
                        alt=""
                      />
                      <span className="my-projects__item-curr">USDT</span>
                    </div>
                  </div>
                  <div className="my-projects__item-to">
                    <div className="my-projects__item-text">
                      комиссию платит:
                    </div>
                    <div className="my-projects__item-client">клиент</div>
                  </div>
                </div>
                <div className="my-projects__item-btn">
                  <img src="/img/icons/lock-grey.svg" alt="lock" />
                  <img src="/img/icons/pen.svg" alt="pen" />
                  <img src="/img/icons/trash.svg" alt="trash" />
                  <a href="#">Статистика</a>
                </div>
              </li>
              <li className="my-projects__item">
                <div className="my-projects__item-info">
                  <h3 className="my-projects__item-title main-title">
                    ООО ”Второй”
                  </h3>
                  <a href="#" className="my-projects__item-address">
                    https://www.gemini.com/
                  </a>
                </div>
                <div className="my-projects__item-convertion my-projects__item-convertion--row">
                  <div className="my-projects__item-for">
                    <div className="my-projects__item-text">конвертация в:</div>
                    <div className="my-projects__item-currency">
                      <img
                        className="my-projects__item-pic"
                        src="/img/actives/actives-1.png"
                        alt=""
                      />
                      <span className="my-projects__item-curr">USDT</span>
                    </div>
                  </div>
                  <div className="my-projects__item-to">
                    <div className="my-projects__item-text">
                      комиссию платит:
                    </div>
                    <div className="my-projects__item-client">клиент</div>
                  </div>
                </div>
                <div className="my-projects__item-btn">
                  <img src="/img/icons/lock-grey.svg" alt="lock" />
                  <img src="/img/icons/pen.svg" alt="pen" />
                  <img src="/img/icons/trash.svg" alt="trash" />
                  <a href="#">Статистика</a>
                </div>
              </li>
              <li className="my-projects__item">
                <div className="my-projects__item-info">
                  <h3 className="my-projects__item-title main-title">
                    ООО ”Второй”
                  </h3>
                  <a href="#" className="my-projects__item-address">
                    https://www.gemini.com/
                  </a>
                </div>
                <div className="my-projects__item-convertion my-projects__item-convertion--row">
                  <div className="my-projects__item-for">
                    <div className="my-projects__item-text">конвертация в:</div>
                    <div className="my-projects__item-currency">
                      <img
                        className="my-projects__item-pic"
                        src="/img/actives/actives-1.png"
                        alt=""
                      />
                      <span className="my-projects__item-curr">USDT</span>
                    </div>
                  </div>
                  <div className="my-projects__item-to">
                    <div className="my-projects__item-text">
                      комиссию платит:
                    </div>
                    <div className="my-projects__item-client">клиент</div>
                  </div>
                </div>
                <div className="my-projects__item-btn">
                  <img src="/img/icons/lock-grey.svg" alt="lock" />
                  <img src="/img/icons/pen.svg" alt="pen" />
                  <img src="/img/icons/trash.svg" alt="trash" />
                  <a href="#">Статистика</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCopyToClipboardBtn(
  text: string | undefined,
  handleCopy: () => void
) {
  if (!text) {
    return null;
  }
  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <button type="button" className="admin-marchants__item-block-copy">
        <img src="/img/icons/file-grey.svg" alt="" />
      </button>
    </CopyToClipboard>
  );
}
