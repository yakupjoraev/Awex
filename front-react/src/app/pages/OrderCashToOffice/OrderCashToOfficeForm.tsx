import React, { useEffect } from "react";
import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";
import { IOrderCashToOfficeForm } from "./index";
import { SelectorSimple } from "@components/SelectorSimple";
import { AuthorizedService } from "@awex-api";

interface IProps {
  useFormReturnInstance: UseFormReturn<IOrderCashToOfficeForm>;
  onSubmit: (data: IOrderCashToOfficeForm) => void;
  officeAddresses: {
    label: string;
    value: string;
  }[];
}

const OrderCashToOfficeForm: React.FC<IProps> = ({
  useFormReturnInstance,
  onSubmit,
  officeAddresses,
}) => {
  const [currentRate, setCurrentRate] = React.useState<number>(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useFormReturnInstance;

  useEffect(() => {
    if (getValues("amount") === undefined) return;
    if (getValues("amount").toString() === "") {
      setCurrentRate(0);
      return;
    }
    AuthorizedService.merchantUsdtRate(
      getValues("amount").toString(),
      "usdt"
    ).then((res: any) => {
      setCurrentRate(+res?.rate!);
    });
  }, [watch("amount")]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="actives-action__withdrawal"
    >
      <div
        className={clsx(
          "about-deposit__generation-select invoice__generation-select",
          {
            "about-deposit__generation-select-error": errors?.amount?.message,
          }
        )}
      >
        <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
          <div className="about-deposit__generation-info">
            <label
              className={clsx("about-deposit__generation-title", {
                "about-deposit__generation-title-error":
                  errors?.amount?.message,
              })}
            >
              Сумма
            </label>

            <Controller
              name="amount"
              control={control}
              render={({ field: { value, onChange } }) => (
                <input
                  className="about-deposit__generation-input"
                  type="number"
                  placeholder="Введите сумму"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <p className="about-deposit__generation-crypt">
              ={currentRate * watch("amount") ? watch("amount") : 0} USDT
            </p>
          </div>

          <div
            className="about-deposit__generation-currency open-modal-btn"
            data-modal-id="select-modal"
          >
            <div className="about-deposit__generation-curr">USD</div>
          </div>
        </div>

        <div className="actives-action__withdrawal-header">
          <div className="actives-action__withdrawal-sum">
            Мин. <span>200 USD</span>
          </div>

          <div className="actives-action__withdrawal-sum">
            Мax. <span>200.000 USD</span>
          </div>
        </div>
      </div>
      {errors.amount?.message && (
        <p className="about-deposit__generation-helper-text">
          {errors.amount.message}
        </p>
      )}

      <div
        className="actives-action__withdrawal-group invoice-project__group-select"
        data-select-wrapper
      >
        <Controller
          control={control}
          name="officeAddress"
          render={({ field }) => {
            return (
              <SelectorSimple
                className="actives-action__office-select"
                disabled={false}
                options={officeAddresses}
                value={field.value}
                onChange={field.onChange}
                placeholder="Выберите офис"
                error={Boolean(errors.officeAddress?.message)}
                helperText={errors.officeAddress?.message}
              />
            );
          }}
        />
      </div>

      <div className="actives-action__withdrawal-group invoice-project__group-input">
        <Controller
          control={control}
          name="courierName"
          render={({ field: { value, onChange } }) => (
            <div className="my-projects__group project-group">
              <label className="my-projects__label project-label">
                Имя получателя
              </label>
              <input
                className="my-projects__input project-input"
                type="text"
                placeholder="Ivan Ivanov"
                value={value}
                onChange={onChange}
              />
            </div>
          )}
        />
        {errors.courierName?.message && (
          <p className="about-deposit__generation-helper-text">
            {errors.courierName.message}
          </p>
        )}
      </div>

      <div className="actives-action__withdrawal-group invoice-project__group-input">
        <Controller
          control={control}
          name="courierPhone"
          render={({ field: { value, onChange } }) => (
            <div className="my-projects__group project-group">
              <label className="my-projects__label project-label">
                Номер телефона получателя
              </label>
              <input
                className="my-projects__input project-input"
                type="text"
                placeholder="+99 999-999-999"
                value={value}
                onChange={onChange}
              />
            </div>
          )}
        />
        {errors.courierPhone?.message && (
          <p className="about-deposit__generation-helper-text">
            {errors.courierPhone.message}
          </p>
        )}
      </div>

      <div className="actives-action__withdrawal-group invoice-project__group-input">
        <Controller
          control={control}
          name="courierDocument"
          render={({ field: { value, onChange } }) => (
            <div className="my-projects__group project-group">
              <label className="my-projects__label project-label">
                Номер документа получателя
              </label>
              <input
                className="my-projects__input project-input"
                type="text"
                placeholder="Номер паспорта/ID"
                value={value}
                onChange={onChange}
              />
            </div>
          )}
        />
        {errors.courierDocument?.message && (
          <p className="about-deposit__generation-helper-text">
            {errors.courierDocument.message}
          </p>
        )}
      </div>

      <div className="actives-action__form-btns">
        <button
          type="submit"
          className="actives-action__withdrawal-btn second-btn"
        >
          Заказать
        </button>

        <button
          type="button"
          className="actives-action__withdrawal-btn second-btn"
          onClick={() => alert("NOT IMPLEMENTED")}
        >
          Чат
        </button>
      </div>
    </form>
  );
};

export default OrderCashToOfficeForm;
