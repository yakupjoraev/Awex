export function AdminFeesPage() {
  return (
    <main className="main main--profile-filling">
      <div className="admin-statistic admin-comission">
        <div className="admin-statistic__container">
          <div className="admin-comission__inner">
            <div className="admin-comission__item">
              <p className="admin-comission__label">Общая комиссия</p>
              <div className="admin-comission__groups">
                <div className="admin-comission__group">
                  <p className="admin-comission__group-label">
                    Текущая комиссия
                  </p>
                  <p className="admin-comission__group-sum">0.1%</p>
                </div>
                <div className="admin-comission__group">
                  <p className="admin-comission__group-label">Новая комиссия</p>
                  <p className="admin-comission__group-grey">0.05%</p>
                </div>
                <div className="admin-comission__group">
                  <p className="admin-comission__group-label">
                    Дата и время начала действия:
                  </p>
                  <p className="admin-comission__group-data">
                    25.06.23 14:00 (UTC +3)
                  </p>
                  <img src="/img/icons/calendar.svg" alt="" />
                </div>
              </div>
              <div className="admin-comission__footer">
                <div className="admin-comission__notification">
                  <svg
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={26} height={26} rx={13} fill="#EE2F2B" />
                    <path
                      d="M12.131 14.711V8.679H13.561V14.711H12.131ZM12.131 18V16.219H13.561V18H12.131Z"
                      fill="white"
                    />
                  </svg>
                  <p>
                    {" "}
                    Новая комиссия 0.2% начнет действовать с 24.06.23 в 15:00
                    (UTC +3)
                  </p>
                </div>
                <div className="admin-comission__btns">
                  <a className="admin-comission__btn main-btn" href="#">
                    Откатить
                  </a>
                  <a className="admin-comission__btn second-btn" href="#">
                    Изменить
                  </a>
                </div>
              </div>
            </div>
            <div className="admin-comission__item">
              <p className="admin-comission__label">Индивидуальная комиссия</p>
              <div className="settings-security__search deposits__filter-search search-group">
                <input
                  className="deposits__filter-src search-input"
                  type="search"
                  placeholder="Поиск"
                />
                <img
                  className="deposits__filter-search-img search-img"
                  src="/img/icons/search.svg"
                  alt="Поиск"
                />
              </div>
              <div className="admin-comission__groups">
                <div className="admin-comission__group">
                  <p className="admin-comission__group-label">
                    Текущая комиссия
                  </p>
                  <p className="admin-comission__group-sum admin-comission__group-grey ">
                    0.0%
                  </p>
                </div>
                <div className="admin-comission__group">
                  <p className="admin-comission__group-label">Новая комиссия</p>
                  <p className="admin-comission__group-grey">0.05%</p>
                </div>
                <div className="admin-comission__group">
                  <p className="admin-comission__group-label">
                    Дата и время начала действия:
                  </p>
                  <p className="admin-comission__group-data">
                    25.06.23 14:00 (UTC +3)
                  </p>
                  <img src="/img/icons/calendar.svg" alt="" />
                </div>
              </div>
              <div className="admin-comission__footer">
                <div className="admin-comission__notification">
                  <svg
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={26} height={26} rx={13} fill="#EE2F2B" />
                    <path
                      d="M12.131 14.711V8.679H13.561V14.711H12.131ZM12.131 18V16.219H13.561V18H12.131Z"
                      fill="white"
                    />
                  </svg>
                  <p>
                    {" "}
                    Новая комиссия 0.2% начнет действовать с 24.06.23 в 15:00
                    (UTC +3)
                  </p>
                </div>
                <div className="admin-comission__btns">
                  <a className="admin-comission__btn main-btn" href="#">
                    Откатить
                  </a>
                  <a className="admin-comission__btn second-btn" href="#">
                    Изменить
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
