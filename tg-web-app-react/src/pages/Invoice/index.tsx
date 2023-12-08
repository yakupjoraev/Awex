import React, { useState } from "react";
import * as yup from "yup";
import { orderInvoice } from "../../apis/Awex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IInvoice } from "../../models/invoice.models";
import InvoiceForm from "./InvoiceForm";
import { useOrderInvoice } from "../../services/account.services";
import { useSetOrderTracking } from "../../services/order.services";

export default function Invoice() {
  const [uniqueId, setUniqueId] = useState<string>("");
  const tg = window?.Telegram?.WebApp;

  const { mutate: invoiceOrder, isPending } = useOrderInvoice((response) => {
    setUniqueId(response.uniqueId);
    setOrderTracking({
      chatId: tg?.initDataUnsafe?.chat?.id,
      uniqueId: response.uniqueId,
    });
  });

  const { mutate: setOrderTracking } = useSetOrderTracking();

  const InvoiceFormSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    currency: yup.string().required("Обязательное поле"),
    price: yup.number().required("Обязательное поле"),
    projectId: yup.string().required("Обязательное поле"),
    feePayee: yup.string().required("Обязательное поле"),
    isDeposit: yup.boolean(),
    depositAmount: yup.number().when("isDeposit", {
      is: (isDeposit) => isDeposit == true,
      then: (schema) => schema.required("Обязательное поле"),
    }),
    depositReturnTime: yup.number().when("isDeposit", {
      is: (isDeposit) => isDeposit == true,
      then: (schema) => schema.required("Обязательное поле"),
    }),
    convertTo: yup.string(),
    isTemplate: yup.boolean(),
  });

  const useFormReturn = useForm<IInvoice>({
    resolver: yupResolver(InvoiceFormSchema),
    defaultValues: {
      currency: "usdt",
      isDeposit: false,
      isTemplate: false,
    },
  });

  const handleInvoice = async (data: IInvoice) => {
    const { isDeposit, ...rest } = data;
    const filteredData = {
      ...rest,
      feePayee: rest.feePayee === "false" ? false : true,
    };
    setUniqueId("");
    invoiceOrder(filteredData);
  };

  return (
    <main>
      <div className="wrapper">
        <h1 className="title">Выставление счета</h1>

        <InvoiceForm
          useFormInstance={useFormReturn}
          onSubmit={handleInvoice}
          uniqueId={uniqueId}
          isPending={isPending}
        />
      </div>
    </main>
  );
}
