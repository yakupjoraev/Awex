import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = 60000;
const HOUR = 3600000;

export interface PaymentDetailsCountdownProps {
  expires: Date;
}

export function PaymentDetailsCountdown(props: PaymentDetailsCountdownProps) {
  const [timeLeftLabel, setTimeLeftLabel] = useState("00:00:00");

  useEffect(() => {
    const expires = props.expires.getTime();
    const timerId = setInterval(() => {
      const now = Date.now();
      const timeLeft = expires - Date.now();
      setTimeLeftLabel(formatTimeLeft(timeLeft));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [props.expires]);

  return <>{timeLeftLabel}</>;
}

function formatTimeLeft(timeLeft: number) {
  if (timeLeft <= 0) {
    return "00:00:00";
  }

  let hours = Math.floor(timeLeft / HOUR);
  timeLeft = timeLeft - hours * HOUR;
  let minutes = Math.floor(timeLeft / MINUTE);
  timeLeft = timeLeft - minutes * MINUTE;
  let seconds = Math.floor(timeLeft / SECOND);

  const hoursStr = hours < 10 ? `0${hours}` : hours.toString();
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();
  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}
