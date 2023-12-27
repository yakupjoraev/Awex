import { useEffect, useId, useState } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import { addCodeWordFormSchema } from "./validators"
import { yupResolver } from "@hookform/resolvers/yup"
import { AuthenticatedService } from "@awex-api"
import toast from "react-hot-toast"
import { msg } from "@constants/messages"


interface AddCodeWordFormData {
    oldWord?: string
    codeWord: string
    repeatCodeWord: string
}


export function AddCodeWord() {
    const codeWordId = useId()
    const repeatCodeWordId = useId()
    const [isSet, setIsSet] = useState<boolean>(false)
    const [settigInProcess, setSettigInProcess] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm<AddCodeWordFormData>({
        resolver: yupResolver(addCodeWordFormSchema),
    })


    useEffect(() => {
        checkSecret()
    }, [])


    function checkSecret() {
        AuthenticatedService.accountProfileCheckSecret()
        .then((response) => {
            if(!response || !('isSet' in response)) {
                setIsSet(false)
                return
            }
            setIsSet(response.isSet)
        })
        .catch((error) => {
            console.error(error)
            setIsSet(false)
        })
    }

    const handleAddedSubmit = handleSubmit((formData) => {
        console.log('handleAddedSubmit start', settigInProcess)
        if(settigInProcess) return

        if(isSet && (!formData.oldWord || formData.oldWord?.length <= 0)) {
            console.log('SECRET_WORD_ERROR')
            toast.error(msg.SECRET_WORD_ERROR)
            setError("oldWord", { message: msg.SECRET_WORD_ERROR })
            return
        }

        if (formData.codeWord !== formData.repeatCodeWord) {
            console.log('SECRET_WORD_REPEAT_ERROR')
            setError("repeatCodeWord", { message: msg.SECRET_WORD_REPEAT_ERROR })
            return
        }
        setSettigInProcess(true)

        AuthenticatedService.accountProfileSetSecret(formData.codeWord, formData.oldWord)
        .then((response) => {
            if(!response) {
                toast.error(msg.UNEXPECTED_ERROR)
                return
            }
            toast.success(msg.SAVED_SUCCESS)
            checkSecret()
        })
        .catch((error) => {
            console.error(error)
            toast.error(msg.SERVER_ERROR)
        })
        .finally(() => {
            setSettigInProcess(false)
            reset()
        })
    })


    return (
        <form className="settings-profile__select" onSubmit={handleAddedSubmit}>
            <div className="settings-security__header">
                <h3 className="settings-security__title">Кодовое слово</h3>
            </div>

            <div className="settings-security__middle">
                <p className="settings-security__text">
                    Позволяет заблокировать ваш аккаунт в случае взлома и даже утрате доступа к нему. Обязательно запомните кодовое слово, т.к. вы не сможете его посмотреть или изменить.<br/>
                    Длина секретного поля должна быть больше или равна 12.
                </p>
            </div>

            <div className="settings-security__middle">
                { isSet && (
                    <div className="my-projects__group project-group">
                        <label className="my-projects__label project-label"
                            htmlFor={codeWordId}
                        >Текущее кодовое слово</label>

                        <input className="my-projects__input project-input" type="text" placeholder="Введите текущее кодовое слово"
                            id={codeWordId}
                            {...register("oldWord")}
                        />

                        {renderFieldError(errors, "oldWord")}
                    </div>
                )}

                <div className="my-projects__group project-group">
                    <label className="my-projects__label project-label"
                        htmlFor={codeWordId}
                    >Новое кодовое слово</label>

                    <input className="my-projects__input project-input" type="text" placeholder="Введите кодовое слово"
                        id={codeWordId}
                        {...register("codeWord")}
                    />

                    {renderFieldError(errors, "codeWord")}
                </div>

                <div className="my-projects__group project-group">
                    <label className="my-projects__label project-label"
                        htmlFor={repeatCodeWordId}
                    >Повторите кодовое слово</label>
                    
                    <input className="my-projects__input project-input" type="text" placeholder="Введите кодовое слово"
                        id={repeatCodeWordId}
                        {...register("repeatCodeWord")}
                    />

                    {renderFieldError(errors, "repeatCodeWord")}
                </div>
            </div>

            <button type="submit" className="settings-security__btn main-btn">Сохранить</button>
        </form>
    )
}

function renderFieldError(
    errors: FieldErrors<AddCodeWordFormData>,
    field: keyof AddCodeWordFormData
  ) {
    const error = errors[field]
    if (!error || !error.message) {
      return null
    }
    return <div className="project-error">{error.message}</div>
  }