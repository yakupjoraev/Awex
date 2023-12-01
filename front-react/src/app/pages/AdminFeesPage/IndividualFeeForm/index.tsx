import { useEffect, useId, useMemo, useState } from "react";
import { DateInput } from "../DateInput";
import { FeeInput } from "../FeeInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { individualFeeFormSchema } from "./validators";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";

export interface Fee {
  current: number;
  next?: number;
  nextTimestamp?: number;
}

export type FeeStatus = "init" | "loading" | "success" | "failed";

export interface FeeFormProps {
  fee: Fee;
  feeStatus: FeeStatus;
  onSubmit: (
    fee: number,
    startAt: Date | null,
    cb: (success: boolean) => void
  ) => void;
  onRetry: () => void;
}

interface FeeFormData {
  nextFee: string;
  startAt?: Date;
}

const DEFAULT_FORM_DATA: FeeFormData = {
  nextFee: "",
  startAt: undefined,
};

const DEFAULT_SEARCH = "";
const QUERY_PARAM_SEARCH = "merchant";

export function IndividualFeeForm(props: FeeFormProps) {
  const personalCurrentFeeId = useId();
  const personalNextFeeId = useId();
  const personalStartId = useId();
  const [updating, setUpdating] = useState(false);
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [searchText, setSearchText] = useState(DEFAULT_SEARCH);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    submitTextFilter();
  };

  const submitTextFilter = () => {
    const normalizedSearchText = searchText.trim();

    if (searchParams.get(QUERY_PARAM_SEARCH) === normalizedSearchText) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    if (normalizedSearchText.length === 0) {
      nextSearchParams.delete(QUERY_PARAM_SEARCH);
    } else {
      nextSearchParams.set(QUERY_PARAM_SEARCH, normalizedSearchText);
    }
    setSearchParams(nextSearchParams);
  };

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.currentTarget.value);
  };

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FeeFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(individualFeeFormSchema),
  });

  const handleFormSubmit = handleSubmit((formData) => {
    const disabled = updating || props.feeStatus === "loading";
    if (disabled) {
      return;
    }

    if (!formData.nextFee) {
      return;
    }
    const nextFeeStr = formData.nextFee.slice(0, -1);
    const nextFee = parseFloat(nextFeeStr);
    if (isNaN(nextFee)) {
      return;
    }

    const startAt = formData.startAt;

    setUpdating(true);
    props.onSubmit(nextFee, startAt ?? null, (_success: boolean) => {
      reset();
      setUpdating(false);
    });
  });

  const submittedSearchText = useMemo(() => {
    const searchText = searchParams.get(QUERY_PARAM_SEARCH);
    return searchText === null ? DEFAULT_SEARCH : searchText;
  }, [searchParams]);

  useEffect(() => {
    setSearchText(submittedSearchText);
  }, []);

  useEffect(() => {
    if (searchInputFocused) {
      return;
    }
    submitTextFilter();
  }, [searchInputFocused]);

  useEffect(() => {}, [searchParams]);

  const disabled = updating || props.feeStatus === "loading";

  console.log(props.fee);

  return (
    <form className="admin-comission__item" onSubmit={handleFormSubmit}>
      <p className="admin-comission__label">Индивидуальная комиссия</p>
      <form onSubmit={handleSearchFormSubmit}>
        <div className="admin-applications__search search-group">
          <input
            className="admin-applications__src search-input"
            type="search"
            name="merchant"
            placeholder="Поиск по ID/названию/ИНН/адресу"
            value={searchText}
            onChange={handleSearchInputChange}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
          />
          <img
            className="admin-applications__search-img search-img"
            src="/img/icons/search.svg"
            alt="Поиск"
          />
          <button
            className={classNames(
              "search-apply-btn",
              searchInputFocused && "search-apply-btn--active"
            )}
            type="button"
          >
            Применить
          </button>
        </div>
      </form>
      <div className="admin-comission__groups">
        <div className="admin-comission__group">
          <label
            className="admin-comission__group-label"
            htmlFor={personalCurrentFeeId}
          >
            Мерчант:
          </label>
          <input
            className="admin-comission__group-input--disabled"
            id={personalCurrentFeeId}
            type="text"
            value={
              searchParams.get("merchant") === null
                ? "..."
                : `ID${searchParams.get("merchant")}` ?? ""
            }
            readOnly
            disabled
          />
        </div>
        <div className="admin-comission__group">
          <label
            className="admin-comission__group-label"
            htmlFor={personalCurrentFeeId}
          >
            Текущая комиссия:
          </label>
          <input
            className="admin-comission__group-input--disabled"
            id={personalCurrentFeeId}
            type="text"
            value={
              props.fee.current === -1
                ? "..."
                : props.fee.current.toString() + "%"
            }
            readOnly
            disabled
          />
        </div>
        <Controller
          control={control}
          name="nextFee"
          render={({ field }) => {
            return (
              <FeeInput
                id={personalNextFeeId}
                value={field.value}
                inputRef={field.ref}
                disabled={disabled}
                error={"Field is required"}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="0.05%"
              />
            );
          }}
        />
        <div className="admin-comission__error">{errors.nextFee?.message}</div>
        <Controller
          control={control}
          name="startAt"
          render={({ field }) => {
            return (
              <DateInput
                className="admin-comission__group--last-child"
                id={personalStartId}
                value={field.value}
                disabled={disabled}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            );
          }}
        />
        <div className="admin-comission__error">{errors.startAt?.message}</div>
      </div>
      <div className="admin-comission__footer">
        {errors.root?.message && renderNotification(errors.root.message)}
        {props.feeStatus === "failed" &&
          renderFailedNotification(props.onRetry)}
        {props.fee.next !== undefined &&
          props.fee.nextTimestamp !== undefined &&
          renderNextFeeNotification(props.fee.next, props.fee.nextTimestamp)}

        <div className="admin-comission__btns">
          <button
            className="admin-comission__btn main-btn"
            type="button"
            disabled={disabled}
          >
            Откатить
          </button>
          <button
            className="admin-comission__btn second-btn"
            type="submit"
            disabled={disabled}
          >
            Изменить
          </button>
        </div>
      </div>
    </form>
  );
}

function renderNextFeeNotification(fee: number, timestamp: number) {
  return (
    <div className="admin-comission__notification">
      <svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={26} height={26} rx={13} fill="#EE2F2B" />
        <path
          d="M12.131 14.711V8.679H13.561V14.711H12.131ZM12.131 18V16.219H13.561V18H12.131Z"
          fill="white"
        />
      </svg>
      <p>
        Новая комиссия {fee}% начнет действовать с{" "}
        {format(timestamp * 1000, "dd.MM.yy kk:mm (zzz)")}
      </p>
    </div>
  );
}

function renderFailedNotification(onRetry: () => void) {
  return (
    <div className="admin-comission__notification">
      <svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={26} height={26} rx={13} fill="#EE2F2B" />
        <path
          d="M12.131 14.711V8.679H13.561V14.711H12.131ZM12.131 18V16.219H13.561V18H12.131Z"
          fill="white"
        />
      </svg>
      <p>Не удалось загрузить данные.</p>
      <button
        className="admin-comission__retry-btn"
        role="button"
        onClick={onRetry}
      >
        Повторить
      </button>
    </div>
  );
}

function renderNotification(message: string) {
  return (
    <div className="admin-comission__notification">
      <svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={26} height={26} rx={13} fill="#EE2F2B" />
        <path
          d="M12.131 14.711V8.679H13.561V14.711H12.131ZM12.131 18V16.219H13.561V18H12.131Z"
          fill="white"
        />
      </svg>
      <p>{message}</p>
    </div>
  );
}
