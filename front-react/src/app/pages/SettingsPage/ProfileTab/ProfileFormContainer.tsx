import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ProfileForm } from "./ProfileForm";
import { useEffect } from "react";
import {
  getAccountProfile,
  setAccountProfile,
} from "@store/accountProfile/slice";
import { getConfigSettings } from "@store/accountConfigSettings/slice";
import { ProfileData } from "@awex-api";
import toast from "react-hot-toast";

export function ProfileFormContainer() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.accountProfile.data);
  const profileLoading = useAppSelector(
    (state) => state.accountProfile.loadingStatus === "pending"
  );
  const countries = useAppSelector(
    (state) => state.accountConfigSettings.data?.countries
  );
  const countriesLoading = useAppSelector(
    (state) => state.accountConfigSettings.loading
  );

  useEffect(() => {
    dispatch(getAccountProfile());
    dispatch(getConfigSettings());
  }, []);

  const handleUpdateProfile = (opts: ProfileData) => {
    const requests: ProfileData = {
      name: opts.name,
      email: opts.email,
      companyName: opts.companyName,
      phone: opts.phone,
      telegram: opts.telegram,
      country: opts.country,
      url: opts.url,
      legalAddress: opts.legalAddress,
    };
    dispatch(setAccountProfile(requests))
      .unwrap()
      .then(() => {
        toast.success("Профиль обновлен!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось обновить профиль!");
      });
  };

  return (
    <ProfileForm
      profile={profile}
      loading={profileLoading || countriesLoading}
      countries={countries}
      onUpdateProfile={handleUpdateProfile}
    />
  );
}
