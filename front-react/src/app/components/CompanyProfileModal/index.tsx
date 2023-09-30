import classNames from "classnames";
import style from "./style.module.css";
import { memo, useEffect, useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyProfileFormSchema } from "./validators";
import { Selector } from "@components/Selector";

export interface CreateCompanyProfileRequest {
  companyName: string;
  legalAddress: string;
  country: string;
  taxId: string;
  phone: string;
  web: string;
  bankAccount: string;
}

export interface CompanyProfileModalProps {
  open: boolean;
  loading: boolean;
  countries: string[];
  error?: string;
  onCreateCompanyProfile: (opts: CreateCompanyProfileRequest) => void;
  onClose: () => void;
}

interface CompanyProfileFormData {
  companyName: string;
  legalAddress: string;
  country: string;
  taxId: string;
  phone: string;
  web: string;
  bankAccount: string;
}

const DEFAULT_FORM_DATA: CompanyProfileFormData = {
  companyName: "",
  legalAddress: "",
  country: "",
  taxId: "",
  phone: "",
  web: "",
  bankAccount: "",
};

const SelectorMemoized = memo(Selector);

export function CompanyProfileModal(props: CompanyProfileModalProps) {
  const formId = useId();
  const companyNameId = useId();
  const legalAddressId = useId();
  const taxIdId = useId();
  const phoneId = useId();
  const webId = useId();
  const bankAccountId = useId();

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CompanyProfileFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(companyProfileFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  useEffect(() => {
    setError("root", { message: props.error });
  }, [props.error]);

  const handleCompanyProfileFormSubmit = handleSubmit((formData) => {
    props.onCreateCompanyProfile(formData);
  });

  const countryOptions: { label: string; value: string }[] = useMemo(() => {
    return props.countries.map((country) => ({
      label: country,
      value: country,
    }));
  }, [props.countries]);

  return (
    <div className={classNames("modal", { show: props.open })}>
      <div className="modal-content">
        <div className="modal-content__header">
          <h4 className="modal-content__title">Заполните профиль бизнеса</h4>
          <button
            className="close-modal-btn"
            type="button"
            aria-label="close"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>
        <form
          className={classNames("modal-content__main", style["form"])}
          id={formId}
          onSubmit={handleCompanyProfileFormSubmit}
        >
          <div
            className={classNames(
              "my-projects__group project-group",
              style["group"],
              style["control"]
            )}
          >
            <label
              className="my-projects__label project-label"
              htmlFor={companyNameId}
            >
              Название организации
            </label>
            <input
              className="my-projects__input project-input"
              id={companyNameId}
              type="text"
              placeholder="Введите название организации"
              {...register("companyName")}
            />
            {errors.companyName?.message && (
              <div className="project-error">{errors.companyName.message}</div>
            )}
          </div>

          <div
            className={classNames(
              "my-projects__groups project-groups",
              style["group"]
            )}
          >
            <div
              className={classNames(
                "my-projects__group project-group",
                style["control"]
              )}
            >
              <label
                className="my-projects__label project-label"
                htmlFor={phoneId}
              >
                Телефон
              </label>
              <input
                className="my-projects__input project-input"
                id={phoneId}
                type="tel"
                placeholder="Введите номер телефона"
                {...register("phone")}
              />
              {errors.phone?.message && (
                <div className="project-error">{errors.phone?.message}</div>
              )}
            </div>
            <div
              className={classNames(
                "my-projects__group project-group",
                style["control"]
              )}
            >
              <label
                className="my-projects__label project-label"
                htmlFor={legalAddressId}
              >
                Юр. адрес
              </label>
              <input
                className="my-projects__input project-input"
                id={legalAddressId}
                type="text"
                placeholder="Введите юридический адрес организации"
                {...register("legalAddress")}
              />
              {errors.legalAddress?.message && (
                <div className="project-error">
                  {errors.legalAddress.message}
                </div>
              )}
            </div>
          </div>

          <div
            className={classNames(
              "my-projects__groups project-groups",
              style["group"]
            )}
          >
            <div
              className={classNames(
                "my-projects__group project-group",
                style["control"]
              )}
            >
              <label
                className="my-projects__label project-label"
                htmlFor={webId}
              >
                Сайт
              </label>
              <input
                className="my-projects__input project-input"
                id={webId}
                type="text"
                placeholder="Введите адрес сайта организации"
                {...register("web")}
              />
              {errors.web?.message && (
                <div className="project-error">{errors.web.message}</div>
              )}
            </div>
            <div className="my-projects__group my-projects__group--transparent project-group">
              <div className="my-projects__group my-projects__group-changes">
                <div className="my-projects__radios">
                  <div className="my-projects__label project-label">
                    <p className="my-projects__label-descr project-label-descr">
                      Юрисдикция
                    </p>
                  </div>
                </div>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <SelectorMemoized
                      className={style["control"]}
                      value={field.value || ""}
                      options={countryOptions}
                      disabled={props.loading}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.country?.message && (
                  <div className="project-error">{errors.country.message}</div>
                )}
              </div>
            </div>
          </div>

          <div
            className={classNames(
              "my-projects__groups project-groups",
              style["group"]
            )}
          >
            <div
              className={classNames(
                "my-projects__group project-group",
                style["control"]
              )}
            >
              <label
                className="my-projects__label project-label"
                htmlFor={taxIdId}
              >
                ИНН организации
              </label>
              <input
                className="my-projects__input project-input"
                id={taxIdId}
                type="text"
                placeholder="Введите ИНН организации"
                {...register("taxId")}
              />
              {errors.taxId?.message && (
                <div className="project-error">{errors.taxId.message}</div>
              )}
            </div>
            <div
              className={classNames(
                "my-projects__group project-group",
                style["control"]
              )}
            >
              <label
                className="my-projects__label project-label"
                htmlFor={bankAccountId}
              >
                Расчетный счет
              </label>
              <input
                className="my-projects__input project-input"
                id={bankAccountId}
                type="text"
                placeholder="Введите расчетный счет"
                {...register("bankAccount")}
              />
              {errors.bankAccount?.message && (
                <div className="project-error">
                  {errors.bankAccount.message}
                </div>
              )}
            </div>
          </div>

          {errors.root && errors.root.message && (
            <div className={classNames("modal-content__error", style["error"])}>
              {errors.root.message}
            </div>
          )}
        </form>

        <div className="modal-content__btns">
          <button
            type="button"
            className={classNames(
              "modal-content__btn third-btn",
              style["button"]
            )}
            onClick={props.onClose}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={classNames(
              "modal-content__btn second-btn",
              style["button"]
            )}
            form={formId}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
