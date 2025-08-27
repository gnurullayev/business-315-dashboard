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
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";

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

  const handleSuccess = (message: string | null) => {
    if (message) {
      toast.success(message);
      ordersRefetch();
    }
    handleClose();
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
  const { mutate: salesCancelMutate, isPending: salesCancelPending } =
    useMutation({
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
      salesCancelMutate(buildSalesCancelPayload(showOrder as IOrder));
    }
  };

  const handlePrint = (key: "A4" | "micro" | "print-warehouse") => {
    let url = "";
    switch (key) {
      case "A4":
        url = `${routes.PDF_ORDER_PAGE}/${salesType}/${showOrder?.docEntry}`;
        break;
      case "print-warehouse":
        url = `${routes.PDF_WRH_PDF_PAGE}/${salesType}/${showOrder?.docEntry}`;
        break;
      case "micro":
        url = `${routes.PDF_CHEQUE_PAGE}/${salesType}/${showOrder?.docEntry}`;
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="order_create_form__footer">
      <Button type="default" onClick={() => handlePrint("A4")}>
        {t("sales.printA4")}
      </Button>
      <Button type="default" onClick={() => handlePrint("print-warehouse")}>
        {t("sales.printWarehouse")}
      </Button>
      <Button type="default" onClick={() => handlePrint("micro")}>
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
        handleSuccess={handleSuccess}
        salesCancelPending={salesCancelPending}
      />
    </div>
  );
};

export default SalesOrderEditOrShowFooter;
