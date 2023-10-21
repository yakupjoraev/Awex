import { useEffect, useId, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { AppProject } from "../../../types";
import { invoiceFormValidator } from "./validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { InvoiceProjectSelector } from "./InvoiceProjectSelector";
import { InvoiceCurrencySelector } from "./InvoiceCurrencySelector";
import { getProjects } from "@store/projects/slice";
import { AuthenticatedService, AuthorizedService } from "@awex-api";
import toast from "react-hot-toast";
import usePortal from "react-useportal";
import { PaymentLinkModal } from "@components/PaymentLinkModal";

const DEFAULT_PROJECTS: { id: string; project: AppProject }[] = [];

const DEFAULT_CURRENCIES: { currency: string; name?: string; rate?: string }[] =
  [];

interface InvoiceFormData {
  projectId: string;
  name: string;
  amount: number;
  currency: string;
}

const DEFAULT_FORM_DATA: InvoiceFormData = {
  projectId: "",
  name: "",
  amount: 0,
  currency: "",
};

export function InvoicePage() {
  const dispatch = useAppDispatch();

  const nameId = useId();
  const amountId = useId();

  const projects = useAppSelector(
    (state) => state.projects.data || DEFAULT_PROJECTS
  );
  const projectsError = useAppSelector((state) => state.projects.error);

  const [currencies, setCurrencies] = useState(DEFAULT_CURRENCIES);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [currenciesError, setCurrenciesError] = useState<string | null>(null);

  const [paymentLinkModalOpened, setPaymentLinkModalOpened] = useState(false);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);

  const { Portal } = usePortal();

  useEffect(() => {
    setCurrenciesLoading(true);
    AuthorizedService.merchantCurrencies()
      .then((response) => {
        if (!response.currencies) {
          setCurrencies(DEFAULT_CURRENCIES);
        } else {
          const nextCurrencies: {
            currency: string;
            name?: string;
            rate?: string;
          }[] = [];
          for (const listItem of response.currencies) {
            if (listItem.currency === undefined) {
              continue;
            }
            nextCurrencies.push({
              currency: listItem.currency,
              name: listItem.name,
              rate: listItem.rate,
            });
          }
          setCurrencies(nextCurrencies);
        }
      })
      .catch((error) => {
        console.error(error);
        setCurrenciesError(
          typeof error.message === "string"
            ? error.message
            : "failed to load currencies"
        );
      })
      .finally(() => {
        setCurrenciesLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<InvoiceFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(invoiceFormValidator),
  });

  useEffect(() => {
    setValue("projectId", "");
  }, [projects]);

  const handleInvoiceFormSubmit = handleSubmit((formData) => {
    const projectId = parseInt(formData.projectId, 10);
    if (isNaN(projectId)) {
      return;
    }

    AuthorizedService.orderCreate({
      name: formData.name,
      price: formData.amount,
      currency: formData.currency,
      projectId: projectId,
    })
      .then((response) => {
        if (response.uniqueId) {
          setPaymentLinkModalOpened(true);
          setPaymentToken(response.uniqueId);
        } else {
          toast.error("Не удалось создать платежную ссылку.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось создать платежную ссылку.");
      });
  });

  const handlePaymentLinkModalClose = () => {
    setPaymentLinkModalOpened(false);
  };

  const projectOptions = useMemo(() => {
    return projects.map(({ id, project }) => ({
      value: id,
      label: project.name,
      key: id,
    }));
  }, [projects]);

  return (
    <div className="wrapper">
      <Helmet title="Выставление счета" />
      <section className="invoice">
        <div className="invoice__header">
          <div className="invoice__header-label">
            <h1 className="invoice__title main-title">Выставление счета</h1>
          </div>
        </div>

        <form className="invoice__wrapper" onSubmit={handleInvoiceFormSubmit}>
          <Controller
            control={control}
            name="projectId"
            render={({ field }) => {
              return (
                <InvoiceProjectSelector
                  value={field.value}
                  options={projectOptions}
                  error={errors?.projectId?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              );
            }}
          />

          <div className="invoice-project__group project-group invoice__group-textarea">
            <label
              className="invoice-project__label project-label"
              htmlFor={nameId}
            >
              Наименование товара или услуги
            </label>

            <textarea
              className="invoice-project__textarea project-textarea"
              id={nameId}
              placeholder="Введите наименование товара, номер договора, ФИО клиента и комментарий, отображающий особенность услуги или товара"
              {...register("name")}
            ></textarea>
            {errors.name?.message && (
              <div className="project-error">{errors.name.message}</div>
            )}
          </div>

          <div className="about-deposit__generation-select invoice__generation-select">
            <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
              <div className="about-deposit__generation-info">
                <label
                  className="about-deposit__generation-title"
                  htmlFor={amountId}
                >
                  Сумма
                </label>

                <input
                  className="about-deposit__generation-input"
                  id={amountId}
                  type="number"
                  placeholder="Введите сумму"
                  {...register("amount")}
                />
              </div>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => {
                  return (
                    <InvoiceCurrencySelector
                      currency={field.value}
                      currencies={currencies}
                      loading={currenciesLoading}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
            {errors.amount?.message && (
              <div className="project-error">{errors.amount.message}</div>
            )}
            {errors.currency?.message && (
              <div className="project-error">{errors.currency.message}</div>
            )}
          </div>

          {errors.root?.message && (
            <div className="my-projects__error">{errors.root.message}</div>
          )}
          {projectsError && (
            <div className="my-projects__error">
              Не удалось загрузить список проектов.
            </div>
          )}
          <div className="invoice-project__item-btns my-projects__item-btns">
            <button type="submit" className="invoice-project__btn second-btn">
              Сгенерировать платежную ссылку
            </button>
          </div>
        </form>
      </section>
      {paymentToken !== null && (
        <Portal>
          <PaymentLinkModal
            open={paymentLinkModalOpened}
            token={paymentToken}
            onClose={handlePaymentLinkModalClose}
          />
        </Portal>
      )}
    </div>
  );
}
