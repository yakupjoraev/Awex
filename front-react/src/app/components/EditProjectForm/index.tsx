import { ReactNode, useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropdown } from "../../hooks/useDropdown";
import classNames from "classnames";
import { Project } from "@awex-api";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export type EditProjectFormData = Required<Project>;

const DEFAULT_FORM_DATA: EditProjectFormData = {
  name: "",
  description: "",
  feePayee: true,
  paymentBills: false,
  paymentWeb: false,
  paymentTelegram: false,
  activity: "",
  convertTo: Project.convertTo.STABLECOIN,
  currency: "",
  cms: "",
  urlWeb: "",
  urlNotification: "",
  urlPaymentSuccess: "",
  urlPaymentFailure: "",
};

interface EditProjectFormProps {
  project?: Project;
  onSubmit: (formData: EditProjectFormData) => void;
  header?: ReactNode;
  footer?: ReactNode;
}

export function EditProjectForm(props: EditProjectFormProps) {
  const formId = useId();

  const currencyDropdown = useDropdown<HTMLDivElement>();
  const csmDropdown = useDropdown<HTMLDivElement>();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<EditProjectFormData>({ defaultValues: DEFAULT_FORM_DATA });

  useEffect(() => {
    if (props.project === undefined) {
      const currentFormData = getValues();
      if (currentFormData !== DEFAULT_FORM_DATA) {
        reset(DEFAULT_FORM_DATA);
      }
    } else {
      const nextFormState = { ...DEFAULT_FORM_DATA, ...props.project };
      reset(nextFormState);
    }
  }, [props.project]);

  const handleProjectFormSubmit = handleSubmit(props.onSubmit);

  return (
    <form
      className="my-projects__item-wrapper"
      onSubmit={handleProjectFormSubmit}
    >
      {props.header}

      <div className="my-projects__groups project-groups">
        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}name`}
          >
            Название проекта
          </label>
          <input
            className="my-projects__input project-input"
            id={`${formId}name`}
            type="text"
            placeholder="ООО “Первый”"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>

        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}activity`}
          >
            Деятельность
          </label>

          <input
            className="my-projects__input project-input"
            id={`${formId}activity`}
            type="text"
            placeholder="Введите род деятельности"
            {...register("activity", { required: true })}
          />
          {errors.activity?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>
      </div>

      <div className="my-projects__groups project-groups  my-projects__groups--second">
        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}description`}
          >
            Описание проекта
          </label>
          <textarea
            className="my-projects__textarea project-textarea"
            id={`${formId}description`}
            placeholder="Введите краткое описание проекта"
            {...register("description", { required: true })}
          ></textarea>{" "}
          {errors.description?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>

        <div className="my-projects__group my-projects__group-changes">
          <div className="my-projects__radios">
            <div className="my-projects__label project-label">
              <img
                className="my-projects__label-img"
                src="/img/icons/checkbox-circle-checked.svg"
                alt="checkbox-circle-checked"
              />

              <label
                className="my-projects__label-descr project-label-descr"
                htmlFor={`${formId}convert_to_stablecoin`}
              >
                Конвертировать оплату в:
              </label>
            </div>
            <Controller
              name="convertTo"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <div className="my-projects__radio-container">
                    <div className="my-projects__radio-group">
                      <input
                        className="my-projects__radio"
                        id={`${formId}convert_to_stablecoin`}
                        type="radio"
                        name="convert_to"
                        checked={value === Project.convertTo.STABLECOIN}
                        ref={ref}
                        onChange={() => onChange(Project.convertTo.STABLECOIN)}
                        onBlur={onBlur}
                      />

                      <label
                        className="my-projects__radio-label"
                        htmlFor={`${formId}convert_to_stablecoin`}
                      >
                        Стейблкоин
                      </label>
                    </div>

                    <div className="my-projects__radio-group">
                      <input
                        className="my-projects__radio"
                        id={`${formId}convert_to_fiat`}
                        type="radio"
                        name="convert_to"
                        checked={value === Project.convertTo.FIAT}
                        ref={ref}
                        onChange={() => onChange(Project.convertTo.FIAT)}
                        onBlur={onBlur}
                      />

                      <label
                        className="my-projects__radio-label"
                        htmlFor={`${formId}convert_to_fiat`}
                      >
                        Фиат
                      </label>
                    </div>
                  </div>
                );
              }}
            />
          </div>

          <div
            className="my-projects__group-select"
            data-select-wrapper=""
            ref={currencyDropdown.containerRef}
          >
            <div
              className={classNames("my-projects__group-selected", {
                active: currencyDropdown.opened,
              })}
              data-select-arrow=""
              onClick={() => currencyDropdown.toggle()}
            >
              Валюта
              <img
                className="my-projects__group-select-arrow"
                src="/img/icons/mini-arrow-down.svg"
                alt="mini-arrow-down"
              />
            </div>

            <ul
              className={classNames("my-projects__group-list select-list", {
                active: currencyDropdown.opened,
              })}
              data-select-list=""
            >
              <li
                className="my-projects__group-item select-item"
                data-select-item=""
                onClick={() => currencyDropdown.toggle(false)}
              >
                Валюта
              </li>
              <li
                className="my-projects__group-item select-item"
                data-select-item=""
                onClick={() => currencyDropdown.toggle(false)}
              >
                Валюта
              </li>
              <li
                className="my-projects__group-item select-item"
                data-select-item=""
                onClick={() => currencyDropdown.toggle(false)}
              >
                Валюта
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-projects__groups project-groups">
        <div className="my-projects__group my-projects__group--transparent project-group">
          <div className="my-projects__radios">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}fee_payee_merchant`}
            >
              Комиссию оплачивает:
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>
            <Controller
              name="feePayee"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <div className="my-projects__radio-container">
                    <div className="my-projects__radio-group">
                      <input
                        className="my-projects__radio"
                        id={`${formId}fee_payee_merchant`}
                        type="radio"
                        name="pay"
                        checked={value === true}
                        ref={ref}
                        onChange={() => {
                          onChange(true);
                        }}
                        onBlur={onBlur}
                      />
                      <label
                        className="my-projects__radio-label"
                        htmlFor={`${formId}fee_payee_merchant`}
                      >
                        Мерчант
                      </label>
                    </div>
                    <div className="my-projects__radio-group">
                      <input
                        className="my-projects__radio"
                        id={`${formId}fee_payee_client`}
                        type="radio"
                        name="pay"
                        value="client"
                        checked={value === false}
                        ref={ref}
                        onChange={() => {
                          onChange(false);
                        }}
                        onBlur={onBlur}
                      />
                      <label
                        className="my-projects__radio-label"
                        htmlFor={`${formId}fee_payee_client`}
                      >
                        Клиент
                      </label>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className="my-projects__group my-projects__group--transparent project-group">
          <div className="my-projects__group my-projects__group-changes">
            <div className="my-projects__radios">
              <div className="my-projects__label project-label">
                <img
                  className="my-projects__label-img"
                  src="/img/icons/checkbox-circle-checked.svg"
                  alt="checkbox-circle-checked"
                />

                <p className="my-projects__label-descr project-label-descr">
                  Использую CMS
                </p>
              </div>
            </div>

            <div
              className="my-projects__group-select"
              data-select-wrapper=""
              ref={csmDropdown.containerRef}
            >
              <div
                className={classNames("my-projects__group-selected", {
                  active: csmDropdown.opened,
                })}
                data-select-arrow=""
                onClick={() => csmDropdown.toggle()}
              >
                Выбрать CMS
                <img
                  className="my-projects__group-select-arrow"
                  src="/img/icons/mini-arrow-down.svg"
                  alt="mini-arrow-down"
                />
              </div>

              <ul
                className={classNames("my-projects__group-list select-list", {
                  active: csmDropdown.opened,
                })}
                data-select-list=""
              >
                <li
                  className="my-projects__group-item select-item"
                  data-select-item=""
                  onClick={() => csmDropdown.toggle(false)}
                >
                  Выбрать CMS
                </li>
                <li
                  className="my-projects__group-item select-item"
                  data-select-item=""
                  onClick={() => csmDropdown.toggle(false)}
                >
                  Выбрать CMS
                </li>
                <li
                  className="my-projects__group-item select-item"
                  data-select-item=""
                  onClick={() => csmDropdown.toggle(false)}
                >
                  Выбрать CMS
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="my-projects__checkboxes">
        <label
          className="my-projects__checkboxes-label project-label"
          htmlFor={`${formId}payment_bills`}
        >
          Как вы планируете принимать платежи:
        </label>

        <div className="my-projects__checkboxes-list">
          <div className="my-projects__checkbox-view checkbox-group">
            <input
              className="my-projects__checkbox-checkbox checkbox-input"
              id={`${formId}payment_bills`}
              type="checkbox"
              {...register("paymentBills")}
            />

            <label
              className="my-projects__checkbox-label checkbox-label"
              htmlFor={`${formId}payment_bills`}
            >
              <div className="my-projects__checkbox-decor checkbox-decor"></div>
              <span className="my-projects__checkbox-text checkbox-text">
                Выставлять счета
              </span>
            </label>
          </div>

          <div className="my-projects__checkbox-view checkbox-group">
            <input
              className="my-projects__checkbox-checkbox checkbox-input"
              id={`${formId}payment_web`}
              type="checkbox"
              {...register("paymentWeb")}
            />

            <label
              className="my-projects__checkbox-label checkbox-label"
              htmlFor={`${formId}payment_web`}
            >
              <div className="my-projects__checkbox-decor checkbox-decor"></div>
              <span className="my-projects__checkbox-text checkbox-text">
                На сайте
              </span>
            </label>
          </div>

          <div className="my-projects__checkbox-view checkbox-group">
            <input
              className="my-projects__checkbox-checkbox checkbox-input"
              id={`${formId}payment_telegram`}
              type="checkbox"
              {...register("paymentTelegram")}
            />

            <label
              className="my-projects__checkbox-label checkbox-label"
              htmlFor={`${formId}payment_telegram`}
            >
              <div className="my-projects__checkbox-decor checkbox-decor"></div>
              <span className="my-projects__checkbox-text checkbox-text">
                В Telegram
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="my-projects__groups project-groups">
        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}url_web`}
          >
            URL сайта или Telegram канала
            <img
              className="my-projects__label-pic"
              src="/img/icons/tooltip.svg"
              alt="tooltip"
            />
          </label>

          <input
            className="my-projects__input project-input"
            id={`${formId}url_web`}
            type="url"
            placeholder="https://www.gemini.com/"
            {...register("urlWeb", { required: true })}
          />
          {errors.urlWeb?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>

        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}url_payment_success`}
          >
            URL успешной оплаты
            <img
              className="my-projects__label-pic"
              src="/img/icons/tooltip.svg"
              alt="tooltip"
            />
          </label>

          <input
            className="my-projects__input project-input"
            id={`${formId}url_payment_success`}
            type="url"
            placeholder="Введите URL"
            {...register("urlPaymentSuccess", { required: true })}
          />
          {errors.urlPaymentSuccess?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>
      </div>

      <div className="my-projects__groups project-groups">
        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}url_notifications`}
          >
            URL уведомлений
            <img
              className="my-projects__label-pic"
              src="/img/icons/tooltip.svg"
              alt="tooltip"
            />
          </label>

          <input
            className="my-projects__input project-input"
            id={`${formId}url_notifications`}
            type="url"
            placeholder="Введите URL"
            {...register("urlNotification", { required: true })}
          />
          {errors.urlNotification?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>

        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={`${formId}url_payment_failure`}
          >
            URL неудачной оплаты
            <img
              className="my-projects__label-pic"
              src="/img/icons/tooltip.svg"
              alt="tooltip"
            />
          </label>
          <input
            className="my-projects__input project-input"
            id={`${formId}url_payment_failure`}
            type="url"
            placeholder="Введите URL"
            {...register("urlPaymentFailure", { required: true })}
          />
          {errors.urlPaymentFailure?.type === "required" && (
            <div className="project-group__error">{MESSAGE_FIELD_REQUIRED}</div>
          )}
        </div>
      </div>

      {props.footer}
    </form>
  );
}
