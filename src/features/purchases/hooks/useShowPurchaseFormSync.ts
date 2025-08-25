import { useEffect } from "react";
import { mapPurchaseToFormValues } from "../lib/showPurchase";

export function useShowPurchaseFormSync({
  formInstance,
  showPurchase,
}: {
  formInstance: any;
  showPurchase: any;
}) {
  useEffect(() => {
    if (showPurchase) {
      const values = mapPurchaseToFormValues(showPurchase);
      formInstance.setFieldsValue(values);
    }
  }, [showPurchase, formInstance]);
}
