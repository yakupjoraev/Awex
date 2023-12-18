import { ReferralLink } from "./ReferralLink"
import { ReferralRules } from "./ReferralRules"
import { ReferralStatistics } from "./ReferralStatistics"
import { ReferralsTable } from "./ReferralsTable"


export function ReferralPage() {

    return (
        <div className="wrapper">
            <section className="referral">
                <div className="deposits__header">
                    <h1 className="deposits__title main-title"> Реферальная программа </h1>
                </div>

                <div className="referral__inner">
                    <ReferralStatistics />
                
                    <ReferralLink />
                
                    <ReferralRules />
                
                    <ReferralsTable />
                </div>
            </section>
        </div>
    )
}