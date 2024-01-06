import { AuthenticatedService } from "@awex-api"
import { useEffect, useState } from "react"


export default function GoogleTwoFA() {
    const [twoFaPoints, setTwoFaPoints] = useState<string[]>([])
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)


    useEffect(() => {
        getTwoFaPoints()
    }, [])


    function getTwoFaPoints() {
        AuthenticatedService.otpEnabled()
        .then((reponse) => {
            if(!reponse) {
                return
            }
            setTwoFaPoints(reponse.enabled)
        })
        .catch((error) => {
            console.error(error)
            setTwoFaPoints([])
        })
    }

    function handleSnapButtonClick() {
        setIsFormOpen(true)
    }


    return (
        <div className="settings-profile__select">
            <div className="settings-security__header">
                <h3 className="settings-security__title">Google 2FA</h3>
            </div>

            <div className="settings-security__middle">
                <p className="settings-security__text">
                    Обязательный второй фактор для выполнения ответственных операций и
                    авторизации на вашем аккаунте. После настройки, для подтверждения
                    важных действий потребуется вводить коды, генерируемые в
                    приложении.
                </p>
            </div>

            { twoFaPoints.length === 0 && !isFormOpen && (        
                <button className="settings-security__btn main-btn" type="button"
                    onClick={handleSnapButtonClick}
                >
                    Привязать
                </button>
            )}

            { (twoFaPoints.length > 0 || isFormOpen) && (        
                <form className="settings-profile__select"
                >

                    <div className="my-projects__group project-group"
                        >
                        <label className="my-projects__label project-label"
                            htmlFor={'google'}
                        >
                            Aутентификатор Google
                        </label>

                        <input className="my-projects__input project-input" type="text"
                            id={'google'}
                            placeholder="Введите url аутентификатора Google"
                        />
                    </div>

                    <div className="my-projects__group project-group"
                        >
                        <label className="my-projects__label project-label"
                            htmlFor={'gmail'}
                        >
                            Gmail
                        </label>

                        <input className="my-projects__input project-input" type="text"
                            id={'gmail'}
                            placeholder="Введите адрест электронной почты Gmail"
                        />
                    </div>

                    <div className="my-projects__group project-group"
                        >
                        <label className="my-projects__label project-label"
                            htmlFor={'facebook'}
                        >
                            Логин Facebook
                        </label>

                        <input className="my-projects__input project-input" type="text"
                            id={'facebook'}
                            placeholder="Введите логин facebook"
                        />
                    </div>
                
                </form>
            )}
        </div>
    )
}