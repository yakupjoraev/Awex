import { FeeFormContainer } from "./FeeFormContainer";
import { IndividualFeeFormContainer } from "./IndividualFormContainer";

export function AdminFeesPage() {
  return (
    <main className="main main--profile-filling">
      <div className="admin-statistic admin-comission">
        <div className="admin-statistic__container">
          <div className="admin-comission__inner">
            <FeeFormContainer />
            <IndividualFeeFormContainer />
          </div>
        </div>
      </div>
    </main>
  );
}
