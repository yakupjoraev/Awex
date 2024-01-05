import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AuthorizedService,
  ProjectItemAdmin,
  ProjectListAdmin,
} from "@awex-api";
import { RequestAdditionalInfoModalContainer } from "@containers/RequestAdditionalInfoModalContainer";
import { AdminRejectProjectModalContainer } from "@containers/AdminRejectProjectModalContainer";
import ApplicationForNewProjectList from "../AdminProjects/AdminProjectList";
import classes from "./AdminProject.module.css";

const AdminProjectDetails: React.FC = () => {
  const [application, setApplication] = useState<ProjectItemAdmin>();
  const [
    isRequestAdditionalInfoModalOpened,
    setIsRequestAdditionalInfoModalOpened,
  ] = useState(false);
  const [isAdminRejectProjectModalOpened, setIsAdminRejectProjectModalOpened] =
    useState(false);

  const { projectId } = useParams<{ projectId: string }>();

  const navigate = useNavigate();

  const handleApprove = () => {
    AuthorizedService.administratorProjectApprove(projectId!).then((res) => {
      if (res.message) {
        navigate(-1);
      }
    });
  };

  const handleCloseRequestAdditionalInfoModal = () => {
    setIsRequestAdditionalInfoModalOpened(false);
  };

  const handleAdminRejectProjectModalClose = () => {
    setIsAdminRejectProjectModalOpened(false);
  };

  useEffect(() => {
    if (projectId) {
      AuthorizedService.administratorProjectGet(projectId).then((res) => {
        setApplication(res);
      });
    }
  }, [projectId]);

  return (
    <section className={classes.container}>
      <Link to="/admin/applications/projects" className={classes["back-link"]}>
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

        <ApplicationForNewProjectList
          applications={[
            {
              id: projectId,
              user_id: application?.userId,
              validation_requested_at:
                application?.validationRequestedAt ||
                application?.validation?.approve?.timestamp ||
                application?.validation?.reject?.timestamp,
            } as ProjectListAdmin,
          ]}
          isDetailsButton={false}
        />
      </div>

      <div className={classes["info-container"]}>
        <h2 className={classes["project-title"]}>
          Запрос на добавление нового проекта №{projectId}
        </h2>
        <h3 className={classes["merchant-label"]}>
          Мерчант: ID{application?.userId}
        </h3>

        <div className={classes["info-grid-container"]}>
          <div className={classes["info-table-single-item"]}>
            <p className={classes["info-table-single-item__label"]}>
              Название проекта
            </p>
            <p>{application?.draft?.name || application?.data?.name}</p>
          </div>
          <div className={classes["info-table-triple-item"]}>
            <p className={classes["info-table-triple-item__label"]}>Описание</p>
            <p>
              {application?.draft?.description ||
                application?.data?.description}
            </p>
          </div>
          <div className={classes["info-table-single-item"]}>
            <p className={classes["info-table-single-item__label"]}>
              URL сайта или Telegram канала
            </p>
            <p>{application?.draft?.urlWeb || application?.data?.urlWeb}</p>
          </div>
          <div className={classes["info-table-single-item"]}>
            <p className={classes["info-table-single-item__label"]}>
              URL уведомлений
            </p>
            <p>
              {application?.draft?.urlNotification ||
                application?.data?.urlNotification}
            </p>
          </div>
          <div
            className={classes["info-table-single-item"]}
            style={{
              gridRow: 1 / 6,
            }}
          >
            <p className={classes["info-table-single-item__label"]}>
              Деятельность
            </p>
            <p>{application?.draft?.activity || application?.data?.activity}</p>
          </div>
          <div
            className={classes["info-table-unwrapped-grid"]}
            style={{
              gridRowStart: 2,
              gridRowEnd: 5,
            }}
          >
            <div className={classes["info-table-unwrapped-grid__first_item"]}>
              <div className={classes["info-table-unwrapped-grid__item"]}>
                <p
                  className={classes["info-table-unwrapped-grid__item__label"]}
                >
                  Конвертировать оплату в:
                </p>
                <p
                  className={classes["info-table-unwrapped-grid__item__value"]}
                >
                  {application?.draft?.convertTo ||
                    application?.data?.convertTo}
                </p>
              </div>
              <div className={classes["info-table-unwrapped-grid__item"]}>
                <p
                  className={classes["info-table-unwrapped-grid__item__label"]}
                >
                  Использую CMS:
                </p>
                <p
                  className={classes["info-table-unwrapped-grid__item__value"]}
                >
                  {application?.draft?.cms || application?.data?.cms}
                </p>
              </div>
            </div>
            <div className={classes["info-table-unwrapped-grid__item"]}>
              <p className={classes["info-table-unwrapped-grid__item__label"]}>
                Комиссию оплачивает:
              </p>
              <p className={classes["info-table-unwrapped-grid__item__value"]}>
                {application?.draft?.feePayee || application?.data?.feePayee
                  ? "Мерчант"
                  : "Клиент"}
              </p>
            </div>
            <div className={classes["info-table-unwrapped-grid__item"]}>
              <p className={classes["info-table-unwrapped-grid__item__label"]}>
                Как вы планируете принимать платежи:
              </p>
              <p className={classes["info-table-unwrapped-grid__item__value"]}>
                {application?.draft?.paymentBills ||
                  (application?.data?.paymentBills && "Выставлять счета ")}
                {application?.draft?.paymentTelegram ||
                  (application?.data?.paymentTelegram && "В Telegram ")}
                {application?.draft?.paymentWeb ||
                  (application?.data?.paymentWeb && "На сайте ")}
              </p>
            </div>
          </div>
          <div className={classes["info-table-single-item"]}>
            <p className={classes["info-table-single-item__label"]}>
              URL успешной оплаты
            </p>
            <p>
              {application?.draft?.urlPaymentSuccess ||
                application?.data?.urlPaymentSuccess}
            </p>
          </div>

          <div className={classes["info-table-single-item"]}>
            <p className={classes["info-table-single-item__label"]}>
              URL неудачной оплаты
            </p>
            <p>
              {application?.draft?.urlPaymentFailure ||
                application?.data?.urlPaymentFailure}
            </p>
          </div>
        </div>
      </div>

      {application?.validation?.status === "read" ||
      application?.validation?.status === "waiting" ? (
        <div className={classes.buttons}>
          <button
            onClick={() => setIsAdminRejectProjectModalOpened(true)}
            className={classes["reject-button"]}
          >
            Отклонить
          </button>
          <button
            onClick={() => setIsRequestAdditionalInfoModalOpened(true)}
            className={classes["request-info-button"]}
          >
            Запросить информацию
          </button>
          <button onClick={handleApprove} className={classes["accept-button"]}>
            Подтвердить
          </button>
        </div>
      ) : null}

      <RequestAdditionalInfoModalContainer
        open={isRequestAdditionalInfoModalOpened}
        onClose={handleCloseRequestAdditionalInfoModal}
      />

      <AdminRejectProjectModalContainer
        open={isAdminRejectProjectModalOpened}
        onClose={handleAdminRejectProjectModalClose}
      />
    </section>
  );
};

export default AdminProjectDetails;
