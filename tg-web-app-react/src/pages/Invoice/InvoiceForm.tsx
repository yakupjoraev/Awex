import React, { useContext, useState } from "react";
import { Controller, UseFormReturn, set } from "react-hook-form";
import { IInvoice } from "../../models/invoice.models";
import Select from "../../components/Form/Select";
import {
  useGetCurrencies,
  useGetProjects,
} from "../../services/account.services";
import { AppContext } from "../../store";
import InvoiceInput from "./InvoiceInput";

interface IProps {
  useFormInstance: UseFormReturn<IInvoice>;
  onSubmit: (data: IInvoice) => void;
  uniqueId?: string;
  isPending?: boolean;
}

const InvoiceForm: React.FC<IProps> = ({
  useFormInstance,
  onSubmit,
  uniqueId,
  isPending,
}) => {
  const [showBlock, setShowBlock] = useState<string>("");
  const { config } = useContext(AppContext);

  const { projects } = useGetProjects();
  const { currencies } = useGetCurrencies();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormInstance;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="invoicing">
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InvoiceInput
            id="name"
            label="Наименование товара или услуги"
            type="string"
            placeholder="Введите название"
            value={value}
            onChange={onChange}
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="currency"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            name="currency"
            label="Выбор криптовалюты"
            currentBlockActive={showBlock}
            values={currencies?.order?.map((currency) => ({
              id: currency,
              name: currency?.toUpperCase(),
              value: currency,
            }))}
            onChange={onChange}
            handleChangeBlock={setShowBlock}
            value={value}
            error={Boolean(errors.currency?.message)}
            helperText={errors.currency?.message}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InvoiceInput
            id="sum-3"
            label="Сумма"
            type="number"
            placeholder="Введите сумму"
            value={value}
            onChange={onChange}
            error={Boolean(errors.price?.message)}
            helperText={errors.price?.message}
            rightText={getValues("currency").toUpperCase()}
          />
        )}
      />

      {getValues("currency") !== "usdt" && (
        <Controller
          name="convertTo"
          control={control}
          render={({ field: { onChange } }) => (
            <div className="checkbox-item">
              <label className="checkbox-item__label" htmlFor="checkbox-5">
                <input
                  className="checkbox-item__input"
                  type="checkbox"
                  id="checkbox-5"
                  onChange={(e) => {
                    onChange(e.target.checked === true ? "usdt" : "");
                  }}
                />

                <div className="checkbox-item__decor"></div>

                <span>
                  Конвертировать в{" "}
                  <span className="text-2xl font-bold">USDT</span>
                </span>
              </label>
            </div>
          )}
        />
      )}

      <Controller
        name="feePayee"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            name="feePayee"
            label="Тип комиссии"
            currentBlockActive={showBlock}
            values={[
              {
                id: "merchant",
                name: "Платит мерчант",
                value: "true",
                icon: (
                  <div className="text-[20px] flex justify-center items-center font-[600] rounded-full bg-black w-[45px] h-[45px] text-white">
                    М
                  </div>
                ),
              },
              {
                id: "customer",
                name: "Платит клиент",
                value: "false",
                icon: (
                  <div className="text-[20px] flex justify-center items-center font-[600] rounded-full bg-black w-[45px] h-[45px] text-white">
                    К
                  </div>
                ),
              },
            ]}
            value={value}
            onChange={onChange}
            handleChangeBlock={setShowBlock}
            error={Boolean(errors.feePayee?.message)}
            helperText={errors.feePayee?.message}
          />
        )}
      />

      <Controller
        name="projectId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            name="project"
            label="Выбор проекта"
            currentBlockActive={showBlock}
            values={projects?.list
              ?.filter((project) => project?.data !== null)
              ?.map(
                (project) =>
                  project?.data !== null && {
                    id: project.id,
                    name: project.data.name,
                    value: project.id,
                  }
              )}
            value={value}
            onChange={onChange}
            handleChangeBlock={setShowBlock}
            error={Boolean(errors.projectId?.message)}
            helperText={errors.projectId?.message}
          />
        )}
      />

      <Controller
        name="isTemplate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="checkbox-item">
            <label className="checkbox-item__label" htmlFor="checkbox-6">
              <input
                className="checkbox-item__input"
                type="checkbox"
                id="checkbox-6"
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
                checked={value}
              />

              <div className="checkbox-item__decor"></div>

              <span>Сохранить шаблон</span>
            </label>
          </div>
        )}
      />

      <Controller
        name="isDeposit"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="checkbox-item">
            <label className="checkbox-item__label" htmlFor="checkbox-4">
              <input
                className="checkbox-item__input"
                type="checkbox"
                id="checkbox-4"
                onChange={(e) => {
                  onChange(e.target.checked);
                  setShowBlock(e.target.checked ? "checked-others" : "");
                }}
                checked={value}
              />

              <div className="checkbox-item__decor"></div>

              <span>Использовать депозит</span>
            </label>
          </div>
        )}
      />

      <div
        className={`checked-others ${
          showBlock === "checked-others" ? "checked-others--active" : ""
        }`}
      >
        <Controller
          name="depositAmount"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InvoiceInput
              id="depositAmount"
              label="Сумма депозита"
              type="number"
              placeholder="Введите сумму"
              value={value}
              onChange={onChange}
              error={Boolean(errors.depositAmount?.message)}
              helperText={errors.depositAmount?.message}
            />
          )}
        />

        <Controller
          name="depositReturnTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InvoiceInput
              id="depositReturnTime"
              label="Срок депозита (суток)"
              placeholder="Срок депозита"
              type="number"
              prefix=" дней"
              value={value}
              onChange={onChange}
              error={Boolean(errors.depositReturnTime?.message)}
              helperText={errors.depositReturnTime?.message}
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="second-btn outline-none hover:border-[#FED602] active:ring-none focus:ring-none hover:ring-none active:outline-none focus:outline-none"
      >
        Сгенерировать платежную ссылку
      </button>

      {uniqueId && (
        <>
          <div className="copy">
            <input
              type="text"
              className="copy__text"
              defaultValue={`${config.siteUrl}/payment/${uniqueId}`}
            />

            <button
              type="button"
              className="copy__btn"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${config.siteUrl}/payment/${uniqueId}`
                )
              }
            >
              <img src="./img/icons/copy.svg" alt="copy" />
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default InvoiceForm;
