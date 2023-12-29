import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { IOrderCashToOfficeForm } from "./index";
import { SelectorSimple } from "@components/SelectorSimple";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormReturnInstance;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="actives-action__withdrawal"
    >
      <div className="about-deposit__generation-select invoice__generation-select">
        <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
          <div className="about-deposit__generation-info">
            <label className="about-deposit__generation-title">Сумма</label>

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

            <p className="about-deposit__generation-crypt">=1 BTC</p>
          </div>

          <div
            className="about-deposit__generation-currency open-modal-btn"
            data-modal-id="select-modal"
          >
            <div className="about-deposit__generation-curr">RUB</div>
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
                disabled={false}
                options={officeAddresses}
                value={field.value}
                onChange={field.onChange}
                placeholder="Выберите офис"
              />
            );
          }}
        />
      </div>

      <button
        type="button"
        className="actives-action__withdrawal-btn second-btn"
        onClick={() => alert("NOT IMPLEMENTED")}
      >
        Заказать
      </button>
    </form>
  );
};

export default OrderCashToOfficeForm;
