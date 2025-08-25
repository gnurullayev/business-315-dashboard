import { useEffect } from "react";
import type { IOrder } from "@/types/order";
import { mapOrderToFormValues } from "../lib/salesOrders";

export function useOrderFormSync({
  formInstance,
  showOrder,
}: {
  formInstance: any;
  showOrder: IOrder | null;
}) {
  useEffect(() => {
    if (showOrder) {
      const values = mapOrderToFormValues(showOrder);
      formInstance.setFieldsValue(values);
    }
  }, [showOrder, formInstance]);
}
