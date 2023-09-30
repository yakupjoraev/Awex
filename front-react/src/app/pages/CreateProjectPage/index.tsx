import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  EditProjectForm,
  EditProjectFormData,
} from "@components/EditProjectForm";
import { CreateProjectFooter } from "./CreateProjectFooter";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { createProject } from "@store/projects/slice";
import { toast } from "react-hot-toast";
import { AuthenticatedService, AuthorizedService } from "@awex-api";
import { useEffect, useMemo, useState } from "react";
import { getCompanies } from "@store/companies/slice";
import { AppProject } from "src/types";

const DEFAULT_CURRENCIES: { name: string; type: "fiat" | "crypto" }[] = [];

export function CreateProjectPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [currenciesLoadingError, setCurrencyLoadingError] = useState(false);
  const [currencies, setCurrenceis] = useState(DEFAULT_CURRENCIES);
  const companiesLoading = useAppSelector((state) => state.companies.loading);
  const companies = useAppSelector((state) => state.companies.data);

  useEffect(() => {
    setCurrenciesLoading(true);
    AuthorizedService.currenciesList()
      .then((response) => {
        if (response.convertTo) {
          const nextCurrencies: {
            name: string;
            type: "fiat" | "crypto";
          }[] = [];
          for (const { name, type } of response.convertTo) {
            if (name && type) {
              if (type === "fiat") {
                nextCurrencies.push({ name, type });
              } else if (type === "crypto") {
                nextCurrencies.push({ name, type: "crypto" });
              }
            }
          }
          setCurrenceis(nextCurrencies);
        }
      })
      .catch((error) => {
        setCurrencyLoadingError(error?.message || "failed to load currencies");
      })
      .finally(() => {
        setCurrenciesLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const handleCancelBtnClick = () => {
    navigate("/projects");
  };

  const handleSubmit = (formData: EditProjectFormData) => {
    const companyId = parseInt(formData.companyId, 10);

    const projectData: AppProject = {
      companyId: companyId,
      name: formData.name,
      description: formData.description,
      feePayee: formData.feePayee,
      paymentBills: formData.paymentBills,
      paymentWeb: formData.paymentWeb,
      paymentTelegram: formData.paymentTelegram,
      activity: formData.activity,
      convertTo: formData.convertTo,
      urlWeb: formData.urlWeb,
      urlNotification: formData.urlNotification,
      urlPaymentSuccess: formData.urlPaymentSuccess,
      urlPaymentFailure: formData.urlPaymentFailure,
    };

    setProjectsLoading(true);
    dispatch(createProject({ project: projectData }))
      .unwrap()
      .then(() => {
        toast.success("Проект создан!");
        navigate("/projects");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось создать проект.");
      })
      .finally(() => {
        setProjectsLoading(false);
      });
  };

  const companiesNormalized: { id: string; companyName: string }[] =
    useMemo(() => {
      if (!companies) {
        return [];
      }
      return Object.entries(companies).map(([id, companyName]) => ({
        id,
        companyName,
      }));
    }, [companies]);

  return (
    <div className="wrapper">
      <Helmet title="Добавление проекта" />
      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Добавление проекта</h1>
        </div>

        <h2 className="main-title" hidden>
          окно проекта
        </h2>

        <EditProjectForm
          currencies={currencies}
          companies={companiesNormalized}
          loading={companiesLoading || currenciesLoading || projectsLoading}
          footer={<CreateProjectFooter onCancel={handleCancelBtnClick} />}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
