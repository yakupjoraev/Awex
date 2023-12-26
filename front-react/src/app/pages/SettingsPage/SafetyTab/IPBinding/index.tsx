import { AuthenticatedService } from "@awex-api"
import { msg } from "@constants/messages"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


type IpWhitelistType = {
    ip?: string,
    ipWhitelist?: Array<string>
}


export function IPBinding() {
    const [whitelist, setWhitelist] = useState<IpWhitelistType>({})
    const [currentIPisWhite, setCurrentIPisWhite] = useState<boolean>(false)
    const [isSetIpInProcess, setIsSetIpInProcess] = useState<boolean>(false)


    useEffect(() => {
        getIp()
    }, [])

    useEffect(() => {
        checkIp()
    }, [whitelist])


    function getIp(): void {
        AuthenticatedService.ipGet()
        .then((response) => {
            if(!response) {
                setWhitelist({})
                return
            }
            setWhitelist(response)
        })
        .catch((error) => {
            console.error(error)
            setWhitelist({})
        })
    }

    function checkIp() {
        if(whitelist && whitelist.ip && whitelist.ipWhitelist && whitelist.ipWhitelist.length > 0) {
            if(whitelist.ipWhitelist.find((item) => item === whitelist.ip)) {
                setCurrentIPisWhite(true)
                return
            }
        }
        setCurrentIPisWhite(false)
    }

    function handleBindingClick(): void {
        if(isSetIpInProcess || !whitelist || !whitelist.ip) return
        setIsSetIpInProcess(true)
        AuthenticatedService.ipSet({
            ipWhitelist: [whitelist.ip]
        })
        .then((response) => {
            if(response && response.message === 'Successfully updated') {
                toast.success(msg.ADDED_SUCCESS)
            } else {
                toast.error(msg.SAVED_ERROR)
            }
        })
        .catch((error) => {
            console.log(error)
            toast.error(msg.SAVED_ERROR)
        })
        .finally(() => {
            getIp()
            setIsSetIpInProcess(false)
        })
    }
    

    return (
        <div className="settings-profile__select">
            <div className="settings-security__header">
                <h3 className="settings-security__title">Привязка IP</h3>
            </div>

            <div className="settings-security__middle">
                <p className="settings-security__text">
                    Фактор позволяет существенно поднять уровень безопасности
                    аккаунта, разрешая выполнять определённые операции исключительно с
                    привязанного IP
                </p>
            </div>

            { !currentIPisWhite && (
                <button
                    type="button"
                    className="settings-security__btn main-btn"
                    onClick={handleBindingClick}
                >
                    Привязать мой текущий IP
                </button>
            )}

            { currentIPisWhite && (
                <p className="settings-security__text settings-security__enter--green">
                    Ваш IP { whitelist.ip } уже добавлен
                </p>
            )}
        </div>
    )
}