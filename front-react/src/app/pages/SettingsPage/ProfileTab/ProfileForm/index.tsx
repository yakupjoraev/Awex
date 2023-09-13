import { memo, useEffect, useId, useMemo } from "react";
import { profileFormSchema } from "./validators";
import { FieldErrors, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySelector } from "./CountrySelector";
import { ProfileData } from "@awex-api";

type ProfileFormData = {
  name: string;
  email?: string;
  companyName?: string;
  phone?: string;
  telegram?: string;
  country?: string;
  url?: string;
  legalAddress?: string;
};

const DEFAULT_FORM_DATA: ProfileFormData = {
  name: "",
  email: "",
  companyName: "",
  phone: "",
  telegram: "",
  country: "",
  url: "",
  legalAddress: "",
};

const CountrySelectorMemoized = memo(CountrySelector);

export interface ProfileFormProps {
  profile?: ProfileData;
  loading?: boolean;
  countries?: string[];
  onUpdateProfile: (profileUpdate: ProfileData) => void;
}

export function ProfileForm(props: ProfileFormProps) {
  const nameId = useId();
  const emailId = useId();
  const companyNameId = useId();
  const phoneId = useId();
  const telegramId = useId();
  const countryId = useId();
  const urlId = useId();
  const legalAddressId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(profileFormSchema),
  });

  useEffect(() => {
    reset(props.profile);
  }, [props.profile]);

  const countryOptions: { label: string; value: string }[] = useMemo(() => {
    if (!props.countries) {
      return [];
    }
    return props.countries.map((country) => ({
      label: country,
      value: country,
    }));
  }, [props.countries]);

  const handleProfileFormSubmit = handleSubmit((formData) => {
    const update: ProfileData = {
      name: formData.name,
      email: formData.email || "",
      companyName: formData.companyName || "",
      phone: formData.phone || "",
      telegram: formData.telegram || "",
      country: formData.country || "",
      url: formData.url || "",
      legalAddress: formData.legalAddress || "",
    };
    props.onUpdateProfile(update);
  });

  return (
    <form
      className="settings-profile__selects grid-column-1"
      onSubmit={handleProfileFormSubmit}
    >
      <div className="settings-profile__select">
        <div className="settings-profile__included">
          <p
            className="settings-profile__included-label"
            role="heading"
            aria-level={3}
          >
            Профиль
          </p>

          <div className="my-projects__groups project-groups">
            <div className="my-projects__group project-group">
              <label
                className="my-projects__label project-label"
                htmlFor={nameId}
              >
                Имя
              </label>
              <input
                className="my-projects__input project-input"
                id={nameId}
                type="text"
                placeholder="Ivan Ivanov"
                disabled={props.loading}
                {...register("name")}
              />
              {renderFieldError(errors, "name")}
            </div>

            <div className="my-projects__group my-projects__group--transparent project-group">
              <div className="my-projects__group my-projects__group-changes">
                <div className="my-projects__radios">
                  <div className="my-projects__label project-label">
                    <p className="my-projects__label-descr project-label-descr">
                      Страна
                    </p>
                  </div>
                </div>

                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <CountrySelectorMemoized
                      value={field.value || ""}
                      options={countryOptions}
                      disabled={props.loading}
                      onChange={field.onChange}
                    />
                  )}
                />
                {renderFieldError(errors, "country")}
              </div>
            </div>
          </div>

          <div className="my-projects__groups project-groups">
            <div className="my-projects__group project-group">
              <label
                className="my-projects__label project-label"
                htmlFor={companyNameId}
              >
                Наименование организации
              </label>
              <input
                className="my-projects__input project-input"
                id={companyNameId}
                type="text"
                placeholder="Введите название организации"
                disabled={props.loading}
                {...register("companyName")}
              />
              {renderFieldError(errors, "companyName")}
            </div>

            <div className="my-projects__group project-group">
              <label
                className="my-projects__label project-label"
                htmlFor={legalAddressId}
              >
                Адрес организации
              </label>
              <input
                className="my-projects__input project-input"
                id={legalAddressId}
                type="text"
                placeholder="Введите юридический адрес организации"
                disabled={props.loading}
                {...register("legalAddress")}
              />
              {renderFieldError(errors, "legalAddress")}
            </div>
          </div>

          <div className="my-projects__groups project-groups">
            <div className="my-projects__group project-group">
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
                disabled={props.loading}
                {...register("phone")}
              />
              {renderFieldError(errors, "phone")}
            </div>
            <div className="my-projects__group project-group">
              <label
                className="my-projects__label project-label"
                htmlFor={telegramId}
              >
                Telegram
              </label>
              <input
                className="my-projects__input project-input"
                id={telegramId}
                type="url"
                placeholder="https://t.me/example"
                disabled={props.loading}
                {...register("telegram")}
              />
              {renderFieldError(errors, "telegram")}
            </div>
          </div>

          <div className="my-projects__groups project-groups">
            <div className="my-projects__group project-group">
              <label
                className="my-projects__label project-label"
                htmlFor={urlId}
              >
                Сайт
              </label>
              <input
                className="my-projects__input project-input"
                id={urlId}
                type="string"
                placeholder="Введите адрес сайта организации"
                disabled={props.loading}
                {...register("url")}
              />
              {renderFieldError(errors, "url")}
            </div>
            <div className="my-projects__group project-group">
              <label
                className="my-projects__label project-label"
                htmlFor={emailId}
              >
                E-mail
              </label>
              <input
                className="my-projects__input project-input"
                id={emailId}
                type="string"
                placeholder="login@example.com"
                disabled={props.loading}
                {...register("email")}
              />
              {renderFieldError(errors, "email")}
            </div>
          </div>

          <button
            className="settings-security__btn main-btn"
            type="submit"
            disabled={props.loading}
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}

function renderFieldError(
  errors: FieldErrors<ProfileFormData>,
  field: keyof ProfileFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
