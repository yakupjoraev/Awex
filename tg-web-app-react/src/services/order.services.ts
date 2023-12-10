import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL = "https://awexb2bot.freeblock.site/order-tracking";

const setOrderTracking = (orderTracking: {
  chatId: string;
  uniqueId: string;
}) => {
  return axios.post(API_URL, orderTracking).then((response) => response.data);
};

export const useSetOrderTracking = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: (orderTracking: { chatId: string; uniqueId: string }) =>
      setOrderTracking(orderTracking),
    onSuccess,
    onError,
  });
};
