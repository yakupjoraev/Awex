import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { AuthorizedService } from "@awex-api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OrderCashToOfficeForm from "./OrderCashToOfficeForm";
import toast from "react-hot-toast";
import { msg } from "@constants/messages";

export interface IOrderCashToOfficeForm {
  amount: number;
  officeAddress: string;
  courierName: string;
  courierPhone: string;
  courierDocument: string;
}

const OrderCashToOffice: React.FC = () => {
  const [officeAddresses, setOfficeAddresses] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const navigate = useNavigate();

  const OrderCashToOfficeFormSchema = yup.object().shape({
    amount: yup.number().required("Введите сумму"),
    officeAddress: yup.string().required("Выберете офис"),
    courierName: yup.string().required("Введите имя получателя"),
    courierPhone: yup.string().required("Введите номер телефона получателя"),
    courierDocument: yup
      .string()
      .required("Введите номер документа получателя"),
  });

  const useFormReturn = useForm<IOrderCashToOfficeForm>({
    resolver: yupResolver(OrderCashToOfficeFormSchema),
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (data: IOrderCashToOfficeForm) => {
    AuthorizedService.cashOrder({
      ...data,
      currency: "usd",
      officeId: data.officeAddress,
    })
      .then((res) => {
        toast.success(msg.APPLICATION_SUCCESS);
        navigate(-1);
      })
      .catch(() => {
        toast.error(msg.ADDED_ERROR);
      });
  };

  useEffect(() => {
    AuthorizedService.getOfficeAddresses().then((res) => {
      const addresses = res.list.map((address) => ({
        label: address.address,
        value: address.id.toString(),
      }));
      setOfficeAddresses(addresses);
    });
  }, []);

  return (
    <div className="actives-action">
      <div className="actives-action__inner">
        <button onClick={handleBack} className="actives-check__back">
          <img
            className="actives-check__back-pic"
            src="/img/icons/arrow-left.svg"
            alt="arrow to back"
          />
          Вернуться
        </button>

        <h2 className="actives-action__title">Заказ наличных в офис</h2>

        <OrderCashToOfficeForm
          useFormReturnInstance={useFormReturn}
          onSubmit={handleSubmit}
          officeAddresses={officeAddresses}
        />
      </div>
    </div>
  );
};

export default OrderCashToOffice;
