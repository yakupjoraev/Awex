import { useEffect, useState } from "react";
import { FeeForm, Fee, FeeStatus } from "./GeneralFeeForm";
import { AuthorizedService } from "@awex-api";
import toast from "react-hot-toast";

const DEFAULT_FEE_STATE: Fee = {
  current: -1,
};

export function FeeFormContainer() {
  const [feeStatus, setFeeStatus] = useState<FeeStatus>("loading");
  const [fee, setFee] = useState(DEFAULT_FEE_STATE);

  useEffect(() => {
    setFeeStatus("loading");
    AuthorizedService.feeGet()
      .then((response) => {
        setFee({
          current: response.current ?? 0,
          next: response.next ?? undefined,
          nextTimestamp: response.nextTimestamp ?? undefined,
        });
        setFeeStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setFeeStatus("failed");
      });
  }, []);

  const handleSubmit = (
    fee: number,
    startAt: Date | null,
    cb: (success: boolean) => void
  ) => {
    const timestamp = createTimetampSec(startAt ?? new Date());
    AuthorizedService.feeSet({ fee, timestamp })
      .then(() => {
        toast.success("Коммиссия обновлена");
        setFeeStatus("loading");
        return AuthorizedService.feeGet();
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
    AuthorizedService.feeGet()
      .then((response) => {
        setFee({
          current: response.current ?? 0,
          next: response.next ?? undefined,
          nextTimestamp: response.nextTimestamp ?? undefined,
        });
        setFeeStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setFeeStatus("failed");
      });
  };

  return (
    <FeeForm
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
