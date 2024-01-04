import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthorizedService } from "@awex-api";
import classes from "./AdminCashOrderDetails.module.css";
import { AdminCashOrderApplication } from "src/generated/awex-api/models/AdminCashOrderApplication";
import AdminCashOrderList from "../AdminCashOrder/AdminCashOrderList";
import toast from "react-hot-toast";
import { msg } from "@constants/messages";

const AdminCashOrderDetails: React.FC = () => {
  const [application, setApplication] = useState<AdminCashOrderApplication>();
  const [isLoading, setIsLoading] = useState(false);

  const { applicationId } = useParams<{ applicationId: string }>();

  const navigate = useNavigate();

  const handleApprove = () => {
    setIsLoading(true);
    AuthorizedService.adminCompleteCashOrder(+applicationId!)
      .then((res) => {
        if (res.message) {
          navigate(-1);
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast.error(msg.APPROVE_ERROR);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (applicationId) {
      AuthorizedService.adminCashOrderApplication(+applicationId).then(
        (res) => {
          setApplication(res);
        }
      );
    }
  }, [applicationId]);

  return (
    <section className={classes.container}>
      <Link
        to="/admin/applications/cash-order"
        className={classes["back-link"]}
      >
        <img src="/img/icons/arrow-left.svg" alt="left arrow" />
        <p>Вернуться к Заявкам</p>
      </Link>

      <div className="admin-marchants__list">
        <div className="admin-marchants__item-labels">
          <p className="admin-marchants__item-label">Номер</p>
          <p className="admin-marchants__item-label">Номер/ID офиса</p>
          <p className="admin-marchants__item-label">Дата заявки</p>
          <p className="admin-marchants__item-label" />
        </div>

        <AdminCashOrderList
          applications={[
            {
              id: +applicationId!,
              createdAt: application?.complete
                ? undefined
                : application?.completedAt,
              completedAt: application?.completedAt,
              ...application!,
            },
          ]}
          isDetailsButton={false}
        />
      </div>

      <div className={classes["info-container"]}>
        <h2 className={classes["info-container__title"]}>
          Запрос на доставку наличных в офис №{applicationId}
        </h2>
        <div className={classes["data-container"]}>
          <div className={classes["data-container__left"]}>
            <div className={classes["basic-info-container"]}>
              <div className={classes["merchant-info-container"]}>
                <h3 className={classes["merchant-info-container__title"]}>
                  Офис:
                </h3>
                <p className={classes["merchant-info-container__id"]}>
                  ID{application?.officeId}
                </p>
              </div>

              <div className={classes["project-info-container"]}>
                <h3 className={classes["project-info-container__title"]}>
                  Проект:
                </h3>
                <p className={classes["project-info-container__name"]}>
                  {application?.data?.companyName}
                </p>
              </div>
            </div>
            <div className={classes["address-container"]}>
              <h3 className={classes["address-container__title"]}>Адрес:</h3>
              <p className={classes["address-container__address"]}>
                {application?.data.address}
              </p>
            </div>

            <div className={classes["address-container"]}>
              <h3 className={classes["address-container__title"]}>Сумма:</h3>
              <p className={classes["address-container__address"]}>
                {application?.data.amount}{" "}
                {application?.data.currency.toUpperCase()}
              </p>
            </div>
          </div>

          <div className={classes["data-container__right"]}>
            <div className={classes["data-container__right__recipient"]}>
              <p className={classes["address-container__title"]}>
                Имя получателя:
              </p>
              <p className={classes["address-container__address"]}>
                {application?.data.courierName}
              </p>
            </div>

            <div className={classes["data-container__right__recipient"]}>
              <p className={classes["address-container__title"]}>
                Номер телефона получателя:
              </p>
              <p className={classes["address-container__address"]}>
                {application?.data.courierPhone}
              </p>
            </div>

            <div className={classes["data-container__right__recipient"]}>
              <p className={classes["address-container__title"]}>
                Номер документа получателя:
              </p>
              <p className={classes["address-container__address"]}>
                {application?.data.courierDocument}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.buttons}>
        <button
          disabled={isLoading}
          onClick={handleApprove}
          className={classes["accept-button"]}
        >
          Доставлено
        </button>
      </div>
    </section>
  );
};

export default AdminCashOrderDetails;
