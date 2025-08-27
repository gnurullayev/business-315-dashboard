import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePdfPrint = () => {
  const location = useLocation();
  const [dates, setDates] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const pathArr = location.pathname.split("/");
  const key = pathArr[3];
  const id = pathArr[4];

  const { data, isLoading } = useQuery({
    queryKey: [key, id],
    queryFn: async () => {
      if (key === "order") return await API.getSalesOrders({ docEntry: id });
      return await API.getSalesList({ docEntry: id });
    },
    enabled: !!key && !!id,
  });
  const { data: currencyRate, isLoading: currencyRateLoading } = useQuery({
    queryKey: ["getCurrencyRateByPeriod"],
    queryFn: async () =>
      API.getCurrencyRateByPeriod({ ...dates, currency: "UZS" }),
  });

  useEffect(() => {
    if (data?.data?.length) {
      setDates({
        startDate: data.data[0].docDate,
        endDate: data.data[0].docDueDate,
      });
    }

    if (data?.data?.length && currencyRate?.data?.length) {
      window.print();
    }
  }, [data, currencyRate]);

  return { data, isLoading, currencyRate, currencyRateLoading };
};
