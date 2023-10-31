import { memo, useEffect, useId, useMemo } from "react";
import { profileFormSchema } from "./validators";
import { FieldErrors, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrencySelector } from "./CurrencySelector";
import { ProfileData } from "@awex-api";

type ProfileFormData = {
  name: string;
  email: string;
  telegram?: string;
  currency?: string;
};

const DEFAULT_FORM_DATA: ProfileFormData = {
  name: "",
  email: "",
  telegram: "",
};

const currencyToLabel: Record<string, string> = {
  rub: "RUB",
  eur: "EURO",
  usdt: "USDT",
};

const CurrencySelectorMemoized = memo(CurrencySelector);

export interface ProfileFormProps {
  profile?: ProfileData;
  loading?: boolean;
  currencies?: string[];
  countries?: string[];
  onUpdateProfile: (profileUpdate: ProfileData) => void;
}

export function ProfileForm(props: ProfileFormProps) {
  const nameId = useId();
  const emailId = useId();
  const telegramId = useId();

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
    if (!props.profile) {
      reset(undefined);
    } else {
      const nextFromData: ProfileFormData = {
        name: props.profile.name,
        email: props.profile.email,
        telegram: props.profile.telegram,
        currency: props.profile.displayCurrency,
      };
      reset(nextFromData);
    }
  }, [props.profile]);

  const currencyOptions: { label: string; value: string }[] = useMemo(() => {
    if (!props.currencies) {
      return [];
    }
    return props.currencies.map((currency) => ({
      label: currencyToLabel[currency] || currency,
      value: currency,
    }));
  }, [props.currencies]);

  const handleProfileFormSubmit = handleSubmit((formData) => {
    const update: ProfileData = {
      name: formData.name,
      email: formData.email || "",
      telegram: formData.telegram || "",
      displayCurrency: formData.currency || "",
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
                      Валюта
                    </p>
                  </div>
                </div>

                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <CurrencySelectorMemoized
                      value={field.value || ""}
                      options={currencyOptions}
                      disabled={props.loading}
                      onChange={field.onChange}
                    />
                  )}
                />
                {renderFieldError(errors, "currency")}
              </div>
            </div>
          </div>

          <div className="my-projects__groups project-groups">
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
            </div>{" "}
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
