import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplicationForNewOfficeAddressList from "../AdminOfficeAddresses/AdminOfficeAddressList";
import { AuthorizedService } from "@awex-api";
import { OfficeAddressAdminItem } from "src/generated/awex-api/models/OfficeAddressAdminItem";
import classes from "./AdminOfficeAddressRequest.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminOfficeAddressRequestForm from "./AdminOfficeAddressRequestForm";
import toast from "react-hot-toast";
import { msg } from "@constants/messages";

export type TAdminOfficeAddressRequestForm = {
  request: string;
  files: any[];
};

const AdminOfficeAddressRequest: React.FC = () => {
  const [application, setApplication] = useState<OfficeAddressAdminItem>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { applicationId } = useParams<{ applicationId: string }>();

  const navigate = useNavigate();

  const AdminOfficeAddressRequestFormSchema = yup.object().shape({
    request: yup.string().required("Обязательное поле"),
    files: yup.array().required("Обязательное поле"),
  });

  const useFormReturn = useForm<TAdminOfficeAddressRequestForm>({
    resolver: yupResolver(AdminOfficeAddressRequestFormSchema),
    defaultValues: {
      request: "",
      files: [],
    },
  });

  const onSubmitForm = (data: TAdminOfficeAddressRequestForm) => {
    setLoading(true);

    const formData = new FormData();

    data?.files?.forEach((file) => {
      const fileObject = new Blob([file], { type: file.type });
      formData.append("upload", fileObject, file.name);
    });

    const uploadData = {
      upload: formData.getAll("upload") as Blob[],
    };

    AuthorizedService.uploadOfficeAddressDocumentAdmin(
      applicationId!,
      uploadData
    );

    AuthorizedService.administratorOfficeAddressRequest(applicationId!, {
      request: data.request,
    })
      .then((res) => {
        if (res.message) {
          toast.success(msg.REQUEST_SUCCESS);
          navigate(-1);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (applicationId) {
      AuthorizedService.getAdminOfficeAddress(applicationId).then((res) => {
        setApplication(res);
      });
    }
  }, [applicationId]);

  return (
    <section className={classes.container}>
      <Link
        to="/admin/applications/office-address"
        className={classes["back-link"]}
      >
        <img src="/img/icons/arrow-left.svg" alt="left arrow" />
        <p>Вернуться к Заявкам</p>
      </Link>

      <div className="admin-marchants__list">
        <div className="admin-marchants__item-labels">
          <p className="admin-marchants__item-label">Номер</p>
          <p className="admin-marchants__item-label">Номер/ID мерчанта</p>
          <p className="admin-marchants__item-label">Дата заявки</p>
          <p className="admin-marchants__item-label" />
        </div>

        <ApplicationForNewOfficeAddressList
          applications={{
            page: 1,
            pages: 1,
            list: [{ id: +applicationId!, ...application! }],
          }}
          isDetailsButton={false}
        />
      </div>

      <div className={classes["info-container"]}>
        <h2 className={classes["info-container__title"]}>
          Запрос на добавление нового юр. адреса №{applicationId}
        </h2>

        <div className={classes["data-container"]}>
          <AdminOfficeAddressRequestForm
            useFormInstance={useFormReturn}
            onSubmit={onSubmitForm}
          />
        </div>
      </div>

      {application?.validation?.status === "read" ||
      application?.validation?.status === "waiting" ? (
        <div className={classes.buttons}>
          <button
            onClick={() => navigate(-1)}
            className={classes["reject-button"]}
          >
            Назад
          </button>
          <button
            type="submit"
            form="AdminOfficeAddressRequestForm"
            className={classes["accept-button"]}
            disabled={isLoading}
          >
            Отправить
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default AdminOfficeAddressRequest;
