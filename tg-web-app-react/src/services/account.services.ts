import Api from "../apis/Api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { IBalance } from "../models/balance.models";
import { IInvoice } from "../models/invoice.models";

const getBalance = async () => {
  return Api()
    .get("/account/balance")
    .then((res) => res.data as IBalance);
};

const getProjects = async () => {
  return Api()
    .get("/project")
    .then((res) => res.data);
};

const getCurrencies = async () => {
  return Api()
    .get("/project/currencies")
    .then((res) => res.data);
};

const orderInvoice = async (data: any) => {
  return Api()
    .post("/order/invoice", data)
    .then((res) => res.data as { id: string; uniqueId: string });
};

const getTransacrions = async () => {
  return Api()
    .get("/transaction")
    .then((res) => res.data);
};

export const useGetBalance = () => {
  const {
    data: balance,
    isLoading,
    error,
  } = useQuery({ queryKey: ["Balance"], queryFn: getBalance });

  return { balance, isLoading, error };
};

export const useGetProjects = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({ queryKey: ["Projects"], queryFn: getProjects });

  return { projects, isLoading, error };
};

export const useGetCurrencies = () => {
  const {
    data: currencies,
    isLoading,
    error,
  } = useQuery({ queryKey: ["Currencies"], queryFn: getCurrencies });

  return { currencies, isLoading, error };
};

export const useOrderInvoice = (
  onSuccess?: (response: { id: string; uniqueId: string }) => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: (data: any) => orderInvoice(data),
    onSuccess,
    onError,
  });
};

export const useGetTransactions = () => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({ queryKey: ["Transactions"], queryFn: getTransacrions });

  return { transactions, isLoading, error };
};
