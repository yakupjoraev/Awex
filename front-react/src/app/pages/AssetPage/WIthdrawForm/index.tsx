import { useId } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { withdrawFormSchema } from "./validators";
import toast from "react-hot-toast";
import { useDropdown } from "../../../hooks/useDropdown";
import classNames from "classnames";

export interface WithdrawFormProps {
  onNavBack: () => void;
}

type WithdrawFormData = {
  address: string;
};

const DEFAULT_FORM_DATA: WithdrawFormData = {
  address: "",
};

export function WithdrawForm(props: WithdrawFormProps) {
  const addressId = useId();
  const chainDropdown = useDropdown<HTMLDivElement>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(withdrawFormSchema),
  });

  const handleWithdrawFormSubmit = handleSubmit(() => {
    toast("NOT IMPLEMENTED");
  });

  return (
    <>
        <form
          className="actives-action__withdrawal"
          onSubmit={handleWithdrawFormSubmit}
        >
          <div className="actives-action__withdrawal-group project-group">
            <label
              className="actives-action__withdrawal-label project-label"
              htmlFor={addressId}
            >
              Адрес
            </label>
            <input
              className="actives-action__withdrawal-input project-input"
              id={addressId}
              type="text"
              placeholder="Введите адрес"
              {...register("address")}
            />
            {renderFieldError(errors, "address")}
          </div>
          <div
            className="actives-action__withdrawal-group invoice-project__group-select"
            data-select-wrapper=""
            onClick={() => chainDropdown.toggle()}
            ref={chainDropdown.containerRef}
          >
            <div
              className={classNames("invoice-project__group-selected", {
                active: chainDropdown.opened,
              })}
              data-select-arrow=""
            >
              Выберете сеть
              <img
                className="invoice-project__group-select-arrow"
                src="/img/icons/mini-arrow-down.svg"
                alt="mini-arrow-down"
              />
            </div>
            <ul
              className={classNames("invoice-project__group-list select-list", {
                active: chainDropdown.opened,
              })}
              data-select-list=""
            >
              <li
                className="invoice-project__group-item select-item"
                data-select-item=""
                onClick={() => chainDropdown.toggle(false)}
              >
                Выберете сеть
              </li>
              <li
                className="invoice-project__group-item select-item"
                data-select-item=""
                onClick={() => chainDropdown.toggle(false)}
              >
                Выберете сеть
              </li>
              <li
                className="invoice-project__group-item select-item"
                data-select-item=""
                onClick={() => chainDropdown.toggle(false)}
              >
                Выберете сеть
              </li>
            </ul>
          </div>
          <div className="actives-action__withdrawal-exchange">
            <div className="actives-action__withdrawal-header">
              <h4 className="actives-action__withdrawal-label">
                Вы отправляете
              </h4>
              <div className="actives-action__withdrawal-sum">
                <span>Все:</span>
                2,5672314 BTC
              </div>
            </div>
            <div className="actives-action__withdrawal-deceives">
              <div className="actives-action__withdrawal-deceive">1</div>
              <div className="actives-action__withdrawal-deceive">BTC</div>
            </div>
            <div className="actives-action__withdrawal-deceives-sum">
              =700 000 RUB
            </div>
          </div>
          <button
            type="submit"
            className="actives-action__withdrawal-btn second-btn"
          >
            Вывести 1 BTC
          </button>
        </form>
        <div className="actives-action__inforamation">
          <div className="actives-action__inforamation-header">
            <img
              className="actives-action__inforamation-pic"
              src="/img/icons/check-circle.svg"
              alt="check-circle"
            />
            <h4 className="actives-action__inforamation-title">
              Операция прошла успешно!
            </h4>
          </div>
          <p className="actives-action__inforamation-descr">
            Проверить статус перевода
          </p>
          <a className="actives-action__inforamation-btn third-btn" href="#">
            Проверить
          </a>
        </div>
        <div className="actives-action__inforamation">
          <div className="actives-action__inforamation-header">
            <img
              className="actives-action__inforamation-pic"
              src="/img/icons/times-circle.svg"
              alt="times-circle"
            />
            <h4 className="actives-action__inforamation-title">
              Упс-с! Что-то пошло не так
            </h4>
          </div>
          <p className="actives-action__inforamation-descr">
            Повторите попытку или обратитесь в Службу поддержки
          </p>
          <a className="actives-action__inforamation-btn third-btn" href="#">
            Проверить
          </a>
        </div>
    </>
  );
}

function renderFieldError(
  errors: FieldErrors<WithdrawFormData>,
  field: keyof WithdrawFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
