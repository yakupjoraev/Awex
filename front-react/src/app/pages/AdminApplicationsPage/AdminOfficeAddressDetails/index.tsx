import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplicationForNewOfficeAddressList from "../AdminOfficeAddresses/AdminOfficeAddressList";
import SupportingOfficeDocumentList from "./SupportingOfficeDocumentList";
import { AdminRejectOfficeAddressModalContainer } from "@containers/AdminRejectOfficeAddressModalContainer";
import { AuthorizedService, MerchantItem } from "@awex-api";
import { OfficeAddressAdminItem } from "src/generated/awex-api/models/OfficeAddressAdminItem";
import classes from "./AdminOfficeAddressDetails.module.css";
import { ROUTE } from "@constants/path-locations";
import AdminWaitingRequest from "@components/AdminWaitingRequest";

const AdminOfficeAddressDetails: React.FC = () => {
  const [application, setApplication] = useState<OfficeAddressAdminItem>();
  const [merchant, setMerchant] = useState<MerchantItem>();

  const [
    isAdminRejectOfficeAddressModalOpened,
    setIsAdminRejectOfficeAddressModalOpened,
  ] = useState(false);

  const { applicationId } = useParams<{ applicationId: string }>();

  const navigate = useNavigate();

  const handleApprove = () => {
    AuthorizedService.administratorOfficeApprove(applicationId!).then((res) => {
      if (res.message) {
        navigate(-1);
      }
    });
  };

  const handleAdminRejectOfficeAddressModalClose = () => {
    setIsAdminRejectOfficeAddressModalOpened(false);
  };

  useEffect(() => {
    if (applicationId) {
      AuthorizedService.getAdminOfficeAddress(applicationId).then((res) => {
        setApplication(res);
      });
    }
  }, [applicationId]);

  useEffect(() => {
    if (application?.userId) {
      AuthorizedService.merchantGet(application?.userId?.toString()).then(
        (res) => {
          setMerchant(res);
        }
      );
    }
  }, [application]);

  console.log(application);

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
        {application?.validation?.status !== "waiting" ? (
          <div className={classes["data-container"]}>
            <div className={classes["data-container__left"]}>
              <div className={classes["basic-info-container"]}>
                <div className={classes["merchant-info-container"]}>
                  <h3 className={classes["merchant-info-container__title"]}>
                    Мерчант:
                  </h3>
                  <p className={classes["merchant-info-container__id"]}>
                    ID{application?.userId}
                  </p>
                  <p className={classes["merchant-info-container__name"]}>
                    {merchant?.data?.name}
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
                  {application?.address}
                </p>
              </div>
            </div>

            <div className={classes["data-container__right"]}>
              <h3 className={classes["data-container__right__title"]}>
                Подверждающие документы:
              </h3>
              <SupportingOfficeDocumentList
                documents={application?.data?.userFiles || []}
              />
            </div>
          </div>
        ) : (
          <AdminWaitingRequest />
        )}
      </div>

      {application?.validation?.status === "read" ? (
        <div className={classes.buttons}>
          <button
            onClick={() => setIsAdminRejectOfficeAddressModalOpened(true)}
            className={classes["reject-button"]}
          >
            Отклонить
          </button>
          <button
            onClick={() =>
              navigate(
                ROUTE.ADMIN_APPLICATIONS_OFFICE_ADDRESS_REQUEST_DETAILS_PATH.replace(
                  ":applicationId",
                  applicationId!
                )
              )
            }
            className={classes["request-info-button"]}
          >
            Запросить информацию
          </button>
          <button onClick={handleApprove} className={classes["accept-button"]}>
            Подтвердить
          </button>
        </div>
      ) : null}

      <AdminRejectOfficeAddressModalContainer
        open={isAdminRejectOfficeAddressModalOpened}
        onClose={handleAdminRejectOfficeAddressModalClose}
      />
    </section>
  );
};

export default AdminOfficeAddressDetails;
