import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import type { IOrder } from "@/types/order";

export const usePaymentMutation = ({
  showOrder,
  paymentSuccessShowFn,
  formInstance,
  setReload,
  setOpen,
}: {
  showOrder?: IOrder;
  paymentSuccessShowFn?: (a: string) => void;
  formInstance: any;
  setReload: (cb: (prev: number) => number) => void;
  setOpen: (val: boolean) => void;
}) =>
  useMutation({
    mutationFn: (data: any) => API.postIncomingPaymentBatch(data),
    onSuccess: () => {
      if (showOrder && paymentSuccessShowFn) {
        paymentSuccessShowFn("To'lov qilindi");
      } else {
        toast.success("Harid yaratildi");
      }
      formInstance.resetFields();
      setReload((prev) => prev + 1);
      setOpen(false);
    },
  });
