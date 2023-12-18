import { useState } from "react";
import { ReferralRuleModal } from "../ReferralLink/ReferralRuleModal";


export function ReferralRules() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    return (
        <>
            <a className="referral__rule" href="#"
                onClick={() => setIsOpenModal(true) }
            >
                <img src="./img/icons/note-text.svg" alt="note-text" />
                <span>Правила реферальной программы</span>
            </a>

            <ReferralRuleModal
                isOpen={isOpenModal}
                setStatus={setIsOpenModal}
            />
        </>
    )
}