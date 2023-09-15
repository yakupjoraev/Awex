import { HOME_PAGE_PATH } from "../../constants/path-locations";
import { AdminAuthFormContainer } from "./AdminAuthFormContainer";

export function AdminAuthPage() {
  return (
    <div className="main__body main__body--white">
      <main className="main">
        <div className="wrapper">
          <div className="admin-enter">
            <a href={HOME_PAGE_PATH} className="admin-enter__logo">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={36}
                  height={36}
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <rect
                    x="0.629395"
                    y="0.871094"
                    width={35}
                    height={35}
                    rx={5}
                    fill="#292421"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.0357 10.0512C18.7567 9.91961 18.4471 9.84766 18.1258 9.84766C17.2901 9.84766 16.5325 10.3348 16.1917 11.0912L9.08789 26.8615H11.733L13.4286 22.9794L14.412 20.7514L17.7078 13.1871L19.0357 10.0512ZM19.1021 14.7169L21.7029 20.7176L22.6525 22.9456L24.348 26.8278H27.1627L20.3579 11.7513L19.1021 14.7169ZM20.1416 22.9936L18.0287 18.3457L15.8441 22.9936L20.1416 22.9936Z"
                    fill="#FED602"
                  />
                </svg>
              </span>
              <span>B2B | Административная панель</span>
            </a>
            <div className="admin-enter__main">
              <AdminAuthFormContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
