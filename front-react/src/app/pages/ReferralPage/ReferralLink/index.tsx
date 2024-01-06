import { AuthenticatedService } from "@awex-api"
import { useEffect, useState } from "react"
import { ROUTE } from "@constants/path-locations"
import { CopyToClipboard } from "react-copy-to-clipboard"
import toast from "react-hot-toast"
import { msg } from "@constants/messages"
import { QrModal } from "@components/QrModal"


export function ReferralLink() {
    const [referralCodeIsLoading, setReferralCodeIsLoading] = useState<boolean>(false)
    const [referralCode, setReferralCode] = useState<string>('')
    const [referralLink, setReferralLink] = useState<string>('')
    const [qrIsModalOpen, setQrIsModalOpen] = useState<boolean>(false)


    useEffect(() => {
        getReferralCode()
    }, [])

    useEffect(() => {
        calcReferralLink()
    }, [referralCode])


    function getReferralCode(): void {
        if(referralCodeIsLoading) return
        setReferralCodeIsLoading(true)
        AuthenticatedService.referralLink()
        .then((response) => {
            if(!response || !response.referralCode) {
                setReferralCode('')
                return
            }
            setReferralCode(response.referralCode)
        })
        .catch((error) => {
            console.error(error)
            setReferralCode('')
        })
        .finally(() => {
            setReferralCodeIsLoading(false)
        })
    }

    function calcReferralLink(): void {
        if(!referralCode || referralCode.length === 0) {
            setReferralLink('')
            return
        }
        const cinkOrigin = (typeof window === "undefined" ? "http://example.com" : window.location.origin)
        const link = `${cinkOrigin}${ROUTE.REFERRAL_LINK_PATH}/${referralCode}`
        setReferralLink(link)
    }

    const handleLinkCopy = () => {
        toast.success(msg.CORYED_SUCCESS)
    }

    
    return (
        <div className="referral__middle">
            <div className="referral__middle-block">
                <p className="referral__middle-label"> Реферальная ссылка: </p>
                <input className="referral__middle-input" type="text"
                    value={referralLink}
                    readOnly={true}
                />
            </div>
    
            <div className="referral__middle-block">
                <p className="referral__middle-label"></p>
                <CopyToClipboard text={referralLink} onCopy={handleLinkCopy}>
                    <button type="button" className="referral__middle-btn second-btn">Пригласить друзей</button>
                </CopyToClipboard>
            </div>
    
            <div className="referral__middle-block referral__middle-block--code">
                <div className="referral__middle-label">
                    Реферальный код:
                    <button type="button" className="referral__middle-qr"
                        onClick={() => setQrIsModalOpen(true)}
                    >
                        <img src="/img/icons/QR.svg" alt="QR.svg" />
                    </button>
                </div>
        
                <div className="referral__middle-code">{ referralCode }</div>
            </div>
            
            <QrModal
                open={qrIsModalOpen}
                value={referralLink}
                onClose={() => setQrIsModalOpen(false)}
            />
        </div>
    )
}