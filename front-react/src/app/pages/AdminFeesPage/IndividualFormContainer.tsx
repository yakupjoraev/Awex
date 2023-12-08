import { useEffect, useMemo, useState } from "react";
import { FeeForm, Fee, FeeStatus } from "./GeneralFeeForm";
import { AuthorizedService } from "@awex-api";
import toast from "react-hot-toast";
import { IndividualFeeForm } from "./IndividualFeeForm";
import { useSearchParams } from "react-router-dom";

const DEFAULT_FEE_STATE: Fee = {
  current: -1,
};

export function IndividualFeeFormContainer() {
  const [feeStatus, setFeeStatus] = useState<FeeStatus>("loading");
  const [fee, setFee] = useState(DEFAULT_FEE_STATE);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (
    fee: number,
    startAt: Date | null,
    cb: (success: boolean) => void
  ) => {
    const timestamp = createTimetampSec(startAt ?? new Date());
    AuthorizedService.personalFeeSet(searchParams.get("merchant")!, {
      fee,
      timestamp,
    })
      .then(() => {
        toast.success("Коммиссия обновлена");
        setFeeStatus("loading");
        return AuthorizedService.personalFeeGet(searchParams.get("merchant")!);
      })
      .then((response) => {
        setFeeStatus("success");
        setFee({
          current: response.current ?? 0,
          next: response.next ?? undefined,
          nextTimestamp: response.nextTimestamp ?? undefined,
        });
        cb(true);
      })
      .catch((error) => {
        console.error(error);
        setFeeStatus("failed");
        cb(false);
      });
  };

  const handleRetry = () => {
    setFeeStatus("loading");
    if (searchParams.get("merchant") !== null) {
      AuthorizedService.personalFeeGet(searchParams.get("merchant")!)
        .then((response) => {
          if (response) {
            setFee({
              current: response.current ?? 0,
              next: response.next ?? undefined,
              nextTimestamp: response.nextTimestamp ?? undefined,
            });
            setFeeStatus("success");
          }
        })
        .catch((error) => {
          console.error(error);
          setFeeStatus("failed");
        });
    } else {
      setFee({
        current: -1,
        next: undefined,
        nextTimestamp: undefined,
      });
      setFeeStatus("success");
    }
  };

  useEffect(() => {
    setFeeStatus("loading");
    if (searchParams.get("merchant") !== null) {
      AuthorizedService.personalFeeGet(searchParams.get("merchant") ?? "")
        .then((response) => {
          if (response) {
            setFee({
              current: response.current ?? 0,
              next: response.next ?? undefined,
              nextTimestamp: response.nextTimestamp ?? undefined,
            });
            setFeeStatus("success");
          }
        })
        .catch((error) => {
          console.error(error);
          setFeeStatus("failed");
        });
    } else {
      setFee({
        current: -1,
        next: undefined,
        nextTimestamp: undefined,
      });
      setFeeStatus("success");
    }
  }, [searchParams]);

  return (
    <IndividualFeeForm
      fee={fee}
      feeStatus={feeStatus}
      onSubmit={handleSubmit}
      onRetry={handleRetry}
    />
  );
}

function createTimetampSec(date: Date) {
  return Math.floor(date.getTime() / 1000);
}
