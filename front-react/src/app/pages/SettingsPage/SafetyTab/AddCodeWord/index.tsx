import { useId } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import { addCodeWordFormSchema } from "./validators"
import { yupResolver } from "@hookform/resolvers/yup"


interface AddCodeWordFormData {
    codeWord: string
    repeatCodeWord: string
}


export function AddCodeWord() {
    const codeWordId = useId()
    const repeatCodeWordId = useId()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<AddCodeWordFormData>({
        resolver: yupResolver(addCodeWordFormSchema),
      })


    const handleAddedSubmit = handleSubmit((formData) => {
        if (formData.codeWord !== formData.repeatCodeWord) {
            setError("repeatCodeWord", { message: "Слова не совпадают!" })
            return
        }

        console.log('formData.codeWord', formData.codeWord)
    })


    return (
        <form className="settings-profile__select" onSubmit={handleAddedSubmit}>
            <div className="settings-security__header">
                <h3 className="settings-security__title">Кодовое слово</h3>
            </div>

            <div className="settings-security__middle">
                <p className="settings-security__text">
                    Позволяет заблокировать ваш аккаунт в случае взлома и даже утрате доступа к нему. Обязательно запомните кодовое слово, т.к. вы не сможете его посмотреть или изменить.
                </p>
            </div>

            <div className="settings-security__middle">
                <div className="my-projects__group project-group">
                    <label className="my-projects__label project-label"
                        htmlFor={codeWordId}
                    >Кодовое слово</label>
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