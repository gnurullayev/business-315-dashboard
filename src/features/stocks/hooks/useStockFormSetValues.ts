import { useEffect } from "react";
import type { IStock } from "@/types/stock";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { formatDate } from "@/utils/formatDate";

export function useStockFormSetValues({
  formInstance,
  showStock,
  open,
}: {
  formInstance: any;
  showStock: IStock | null | undefined;
  open: boolean;
}) {
  const userInfo = useSelector((store: RootState) => store.userData);

  useEffect(() => {
    if (open) {
      formInstance.setFieldsValue({
        docDate: dayjs(),
        dueDate: dayjs(),
        fromWarehouseCode: userInfo.wareHouse,
      });
    }

    if (showStock) {
      formInstance.setFieldsValue({
        docDate: formatDate(showStock.docDate, "YYYY-MM-DDTHH:mm:ss"),
        dueDate: formatDate(showStock.dueDate, "YYYY-MM-DDTHH:mm:ss"),
        fromWarehouseCode: showStock.fromWarehouse,
        toWarehouseCode: showStock.toWarehouse,
        items: showStock.stockTransferLines.map((item) => ({
          itemCodes: item.itemCode,
          quantity: item.quantity,
          uoMCode: item.uoMCode,
        })),
      });
    }
  }, [showStock, open, formInstance]);
}
