import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RegisterModalContainer } from "@containers/RegisterModalContainer"
import { useLocalStorage } from "usehooks-ts"


export function ReferralAuthPage() {
    const params = useParams()
    const navigate = useNavigate()
    const [registerModalOpened, setRegisterModalOpened] = useState(false)
    const [referralCode, setReferralCode] = useLocalStorage('referral-code', '')


    useEffect(() => {
        checkReferralId()
    }, [params])

    
    function checkReferralId(): void {
        if(!params || !params.referralId) {
            navigate('/')
            return
        }
        setReferralCode(params.referralId)
        setRegisterModalOpened(true)
    }

    function handleCloseRegisterModal(): void {
        setRegisterModalOpened(false)
        navigate('/')
    }


    return (
        <RegisterModalContainer
          open={registerModalOpened}
          onClose={handleCloseRegisterModal}
        />
    )
}