import { CompanyItem } from "@awex-api";
import {
  CompanyProfileModal,
  CreateCompanyProfileRequest,
} from "@components/CompanyProfileModal";
import { getConfigSettings } from "@store/accountConfigSettings/slice";
import { createCompany } from "@store/companies/slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface CompanyProfileModalContainerProps {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_COUNTRIES: string[] = [];

export function CompanyProfileModalContainer(
  props: CompanyProfileModalContainerProps
) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const countriesLoading = useAppSelector(
    (state) => state.accountConfigSettings.loading
  );
  const countries = useAppSelector(
    (state) => state.accountConfigSettings.data?.countries
  );

  useEffect(() => {
    dispatch(getConfigSettings());
  }, [dispatch]);

  const handleCreateCompanyProfile = (opts: CreateCompanyProfileRequest) => {
    if (loading) {
      return;
    }
    const companyItem: CompanyItem = {
      companyName: opts.companyName,
      legalAddress: opts.legalAddress,
      country: opts.country,
      taxId: opts.taxId,
      phone: opts.phone,
      web: opts.web,
      bankAccount: opts.bankAccount,
    };

    setLoading(true);
    dispatch(createCompany({ companyItem }))
      .unwrap()
      .then(() => {
        toast.success("Профиль бизнеса создан!");
        props.onClose();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось создать профиль бизнеса.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CompanyProfileModal
      open={props.open}
      loading={loading || countriesLoading}
      countries={countries || DEFAULT_COUNTRIES}
      onCreateCompanyProfile={handleCreateCompanyProfile}
      onClose={props.onClose}
    />
  );
}
