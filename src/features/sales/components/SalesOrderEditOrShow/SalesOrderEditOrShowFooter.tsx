import { FormMode } from "@/enums";
import type { FormModeType } from "@/types";
import type { IOrder } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { Dispatch, FC, SetStateAction } from "react";
import SalesOrderFooterButtons from "./SalesOrderFooterButtons";
import {
  buildInvoicePayload,
  buildSalesCancelPayload,
  orderApi,
} from "../../lib/salesOrders";
import type { SalesFormType } from "../../types";

interface IProps {
  handleClose: () => void;
  orderEditLoading: boolean;
  form: any;
  mode: FormModeType;
  setMode: Dispatch<SetStateAction<FormModeType>>;
  showOrder: IOrder | null;
  ordersRefetch: any;
  salesType: SalesFormType;
}

const SalesOrderEditOrShowFooter: FC<IProps> = ({
  handleClose,
  mode,
  setMode,
  showOrder,
  orderEditLoading,
  ordersRefetch,
  salesType,
}) => {
  const { t } = useTranslation();

  const handleSuccess = (message: string) => {
    toast.success(message);
    handleClose();
    ordersRefetch();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: orderApi.createInvoice,
    onSuccess: () => handleSuccess("Order yangilandi"),
  });

  const { mutate: ordersCancelMutate, isPending: ordersCancelPending } =
    useMutation({
      mutationFn: orderApi.cancelOrder,
      onSuccess: () => handleSuccess("Buyurtma bekor qilindi"),
    });

  const { mutate: ordersCloseMutate, isPending: ordersClosePending } =
    useMutation({
      mutationFn: orderApi.closeOrder,
      onSuccess: () => handleSuccess("Buyurtma yopildi"),
    });
  const { mutate: salesCancelMutate } = useMutation({
    mutationFn: orderApi.cancelSales,
    onSuccess: () => handleSuccess("Sotuv bekor qilindi"),
  });

  const addCart = () => {
    if (!showOrder) return;
    mutate(buildInvoicePayload(showOrder));
  };

  const onCancelOrder = () => {
    if (salesType === "order") {
      ordersCancelMutate(showOrder!.docEntry);
    } else {
      // const data = {
      //   cardCode: showOrder?.cardCode,
      //   docDueDate: showOrder?.docDueDate,
      //   docDate: showOrder?.docDate,
      //   docCurrency: showOrder?.docCurrency,
      //   salesPersonCode: showOrder?.slpCode,
      //   comments: showOrder?.comments,
      //   docRate: showOrder?.docRate,
      //   documentLines: showOrder?.documentLines.map((item) => ({
      //     lineNum: item.lineNum,
      //     baseEntry: showOrder.docEntry,
      //     baseLine: item.lineNum,
      //     itemCode: item.itemCode,
      //     quantity: item.quantity,
      //     unitPrice: item.price,
      //     currency: item.price,
      //     warehouseCode: item.warehouseCode,
      //     documentLinesBinAllocations: item.binLocations.map((bin) => ({
      //       binAbsEntry: bin.absEntry,
      //       quantity: bin.quantity,
      //     })),
      //   })),
      // };

      salesCancelMutate(buildSalesCancelPayload(showOrder as IOrder));
    }
  };

  return (
    <div className="order_create_form__footer">
      <Button type="default" onClick={handleClose}>
        {t("sales.printA4")}
      </Button>
      <Button type="default" onClick={handleClose}>
        {t("sales.printWarehouse")}
      </Button>
      <Button type="default" onClick={handleClose}>
        {t("sales.printMicro")}
      </Button>

      <SalesOrderFooterButtons
        mode={mode}
        showOrder={showOrder}
        isPending={isPending}
        ordersClosePending={ordersClosePending}
        ordersCancelPending={ordersCancelPending}
        orderEditLoading={orderEditLoading}
        onEdit={() => setMode(FormMode.EDIT)}
        onAddCart={addCart}
        onCloseOrder={() => ordersCloseMutate(showOrder!.docEntry)}
        onCancelOrder={onCancelOrder}
        salesType={salesType}
      />
    </div>
  );
};

export default SalesOrderEditOrShowFooter;
