import { FeeFormContainer } from "./FeeFormContainer";

export function AdminFeesPage() {
  return (
    <main className="main main--profile-filling">
      <div className="admin-statistic admin-comission">
        <div className="admin-statistic__container">
          <div className="admin-comission__inner">
            <FeeFormContainer />
          </div>
        </div>
      </div>
    </main>
  );
}
