import { Button } from "antd";
import { FormMode, DocStatus } from "@/enums";
import type { FormModeType } from "@/types";
import type { IOrder } from "@/types/order";
import { useTranslation } from "react-i18next";
import type { SalesFormType } from "../../types";
import PaymentModalForm from "@/features/purchases/components/PaymentModalForm";
import { useState } from "react";

interface IProps {
  mode: FormModeType;
  showOrder: IOrder | null;
  isPending: boolean;
  ordersClosePending: boolean;
  ordersCancelPending: boolean;
  orderEditLoading: boolean;
  salesCancelPending: boolean;
  onEdit: () => void;
  onAddCart: () => void;
  onCloseOrder: () => void;
  onCancelOrder: () => void;
  salesType: SalesFormType;
  handleSuccess: (a: string | null) => void;
}

const SalesOrderFooterButtons = ({
  mode,
  showOrder,
  isPending,
  ordersClosePending,
  ordersCancelPending,
  salesCancelPending,
  orderEditLoading,
  onEdit,
  onAddCart,
  onCloseOrder,
  onCancelOrder,
  handleSuccess,
  salesType,
}: IProps) => {
  const { t } = useTranslation();
  const [paymentModalFormOpen, setPaymentModalFormOpen] = useState(false);

  if (showOrder?.docStatus !== DocStatus.OPEN) return null;

  return (
    <>
      {mode === FormMode.SHOW && salesType === "order" && (
        <>
          <Button type="primary" onClick={onEdit}>
            {t("general.edit")}
          </Button>
          <Button
            type="primary"
            onClick={onAddCart}
            loading={isPending}
            disabled={isPending}
          >
            {t("sales.moveToCart")}
          </Button>
          <Button
            type="default"
            onClick={onCloseOrder}
            loading={ordersClosePending}
            disabled={ordersClosePending}
          >
            {t("sales.close")}
          </Button>
        </>
      )}

      {mode === FormMode.EDIT &&
        salesType === "order" &&
        showOrder.docStatus === DocStatus.OPEN && (
          <Button
            type="primary"
            htmlType="submit"
            loading={orderEditLoading}
            disabled={orderEditLoading}
          >
            {t("general.saveChanges")}
          </Button>
        )}
      {salesType === "sales" && showOrder.docStatus === DocStatus.OPEN && (
        <Button
          type="primary"
          onClick={() => setPaymentModalFormOpen(true)}
          loading={isPending}
          disabled={isPending}
        >
          {t("general.pay")}
        </Button>
      )}
      {mode === FormMode.SHOW && showOrder.docStatus === DocStatus.OPEN && (
        <Button
          type="default"
          onClick={onCancelOrder}
          loading={ordersCancelPending || salesCancelPending}
          disabled={ordersCancelPending || salesCancelPending}
        >
          {t("general.cancel")}
        </Button>
      )}
      <PaymentModalForm
        open={paymentModalFormOpen}
        setOpen={setPaymentModalFormOpen}
        setReload={() => null}
        showOrder={showOrder}
        paymentSuccessShowFn={handleSuccess}
        purchasesOrSales="sales"
      />
    </>
  );
};

export default SalesOrderFooterButtons;
