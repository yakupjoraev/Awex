import { useEffect, useId, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldErrors, useForm } from "react-hook-form"
import { blockProfileFormSchema } from "./validators"
import classNames from "classnames"
import { CommonService } from "@awex-api"
import toast from "react-hot-toast"
import { msg } from "@constants/messages"


export interface BlockProfileModalProps {
  open: boolean
  loading: boolean
  onClose: () => void
}

export type BlockProfileModalFormData = {
  login: string
  secretWrod: string
}


const DEFAULT_FORM_DATA: BlockProfileModalFormData = {
  login: '',
  secretWrod: '',
}


export function BlockProfileModal(props: BlockProfileModalProps) {
  const [inProcess, setInProcess] = useState<boolean>(false)
  const loginID = useId()
  const wordID = useId()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<BlockProfileModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(blockProfileFormSchema),
  })


  useEffect(() => {
    reset()
  }, [props.open])


  const handleBlockProfileFormSubmit = handleSubmit((formData) => {
    if(inProcess) return
    setInProcess(true)
    CommonService.accountProfileBlock(formData.login, formData.secretWrod)
    .then((response) => {
      if(!response) {
        toast.error(msg.UNEXPECTED_ERROR)
        return
      }
      toast.success(msg.PROFILE_BLUCKED_SUCCESS)
      reset()
    })
    .catch((error) => {
      console.error(error)
      toast.error(msg.DATA_ERROR)
      setError('login', { message: msg.DATA_CORRECT })
      setError('secretWrod', { message: msg.DATA_CORRECT })
    })
    .finally(() => {
      setInProcess(false)
    })
  })


  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form
        className="modal-content"
        onSubmit={handleBlockProfileFormSubmit}
      >
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />
            <h2>Блокировка профиля</h2>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <p className="modal-content__text">
            Это форма экстренной блокировки профиля в случае его взлома или утраты доступа к нему.
            При блокировке профиля будут деактивированы все активные сеансы и сброшены все пароли. Для восстановления доступа вам нужно написать в техническую поддержку.
          </p>

          <p className="modal-content__text">
            Для блокировки введите ваш логин (E-mail) и секретное слово блокировки. если вы добавили его в настройках профиля. Если вы не помните Секретное слово - напишите в поддержку
          </p>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor={ loginID }>Логин</label>
            <input className="my-projects__input project-input" type="text"
              placeholder="Введите e-mail или логин AWEX"
              id={ loginID }
              {...register("login")}
            />
            {renderFieldError(errors, "login")}
          </div>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor={ wordID }>Секретное слово</label>
            <input className="my-projects__input project-input" type="text"
              placeholder="Введите секретное слово блокировки"
              id={ wordID }
              {...register("secretWrod")}
            />
            {renderFieldError(errors, "secretWrod")}
          </div>

          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="modal-content__btn second-btn"
          disabled={props.loading || inProcess}
        >
          Блокировать профиль
        </button>
      </form>
    </div>
  )
}

function renderFieldError(
  errors: FieldErrors<BlockProfileModalFormData>,
  field: keyof BlockProfileModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null
  }
  return <div className="project-error">{error.message}</div>
}
