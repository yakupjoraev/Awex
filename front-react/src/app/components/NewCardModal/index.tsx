import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { newCardFormSchema } from "./validators";
import classNames from "classnames";
import InputMask from "react-input-mask";

export interface NewCardModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (opts: {
    cardName: string;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
  }) => void;
}

export type NewCardModalFormData = {
  cardName: string;
  cardNumber: string;
  cardMonth: number;
  cardYear: number;
};

const DEFAULT_FORM_DATA = {
  cardName: "",
  cardNumber: "",
};

export function NewCardModal(props: NewCardModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewCardModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(newCardFormSchema),
  });

  const handleNewCardFormSubmit = handleSubmit(
    (formData: NewCardModalFormData) => {
      props.onSubmit({
        ...formData,
        cardMonth: formData.cardMonth.toString(),
        cardYear: formData.cardYear.toString(),
      });
    }
  );

  useEffect(() => {
    reset();
  }, [props.open]);

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form className="modal-content" onSubmit={handleNewCardFormSubmit}>
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Укажите реквизиты карты</h2>
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
          <div className="my-projects__group project-group">
            <input
              className="my-projects__input project-input"
              placeholder="Название карты"
              disabled={props.loading}
              {...register("cardName")}
            />
            {renderFieldError(errors, "cardName")}
          </div>

          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}

          <div className="my-projects__group project-group">
            <InputMask
              mask={"9999-9999-9999-9999"}
              maskChar="-"
              max={16}
              className="my-projects__input project-input"
              placeholder="Номер карты"
              maskPlaceholder=" "
              disabled={props.loading}
              {...register("cardNumber")}
            />
            {renderFieldError(errors, "cardNumber")}
          </div>

          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}

          <div className="settings-requisites__card-expired__wrapper">
            <div className="my-projects__group project-group">
              <InputMask
                mask={"99"}
                max={12}
                min={1}
                type="string"
                className="my-projects__input project-input"
                placeholder="Месяц"
                maskPlaceholder=" "
                disabled={props.loading}
                {...register("cardMonth")}
              />
              {renderFieldError(errors, "cardMonth")}
            </div>

            <p>/</p>

            <div className="my-projects__group project-group">
              <InputMask
                mask={"9999"}
                max={2}
                className="my-projects__input project-input"
                placeholder="Год"
                disabled={props.loading}
                maskPlaceholder=" "
                {...register("cardYear")}
              />
              {renderFieldError(errors, "cardYear")}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="modal-content__btn second-btn"
          disabled={props.loading}
        >
          Добавить
        </button>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<NewCardModalFormData>,
  field: keyof NewCardModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
