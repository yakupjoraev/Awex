export function SessionList() {
  const handleClick = () => {
    alert("NOT IMPLEMENTED!");
  };

  return (
    <div className="settings-profile__select">
      <div className="settings-security__header">
        <h3 className="settings-security__title">Последние входы</h3>

        <button
          type="button"
          className="settings-security__header-btn third-btn"
          onClick={handleClick}
        >
          Выйти со всех устройств
        </button>
      </div>

      <div className="settings-security__middle">
        <div className="settings-security__enters">
          <div className="settings-security__enter settings-security__enter--green">
            <img src="/img/icons/globe.svg" alt="globe" />

            <div className="settings-security__enter-info">
              <h4 className="settings-security__enter-label">
                Windows 10.0, Google Chrome 105.0.0.0
              </h4>

              <p className="settings-security__enter-text">
                WEB, TEST-RU, Russia, Moscow (213.134.209.99)
                <br />
                активность 8 ноя 2022 20:21:42 +4 по 8 ноя 2022 20:21:44 +4
                <br />
                активная сессия (текущая)
              </p>
            </div>
          </div>

          <div className="settings-security__enter">
            <img src="/img/icons/mobile.svg" alt="mobile" />

            <div className="settings-security__enter-info">
              <h4 className="settings-security__enter-label">
                Mobile App AWEX, 202.345.0.0.0
              </h4>

              <p className="settings-security__enter-text">
                WEB, TEST-RU, Russia, Moscow (213.134.209.99)
                <br />
                активность 8 ноя 2022 20:21:42 +4 по 8 ноя 2022 20:21:44 +4
                <br />
                активная сессия (текущая)
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul className="settings-security__pages">
        <li className="settings-security__page">
          <a className="settings-security__page-link" href="#">
            1
          </a>
        </li>

        <li className="settings-security__page">2</li>

        <li className="settings-security__page">
          <a className="settings-security__page-link" href="#">
            3{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}
