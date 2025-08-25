import { Form, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import SalesOrderHeader from "./SalesOrderEditOrShowHeader";
import SalesOrderItemsTable from "./SalesOrderEditOrShowTable";
import SalesOrderFooter from "./SalesOrderEditOrShowFooter";
import "./styles.scss";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormMode } from "@/enums";
import type { FormModeType } from "@/types";
import type { IOrder } from "@/types/order";
import { toast } from "react-toastify";
import { useOrderFormSync } from "../../hooks/useSalesOrders";
import { mapFormValuesToPayload } from "../../lib/salesOrders";
import type { SalesFormType } from "../../types";
import { ErrorBoundary } from "@/components";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showOrder: IOrder | null;
  setShowOrder: Dispatch<SetStateAction<any>>;
  ordersRefetch: any;
  salesType: SalesFormType;
}

const SalesOrderEditOrShow: FC<IProps> = ({
  open,
  setOpen,
  showOrder,
  setShowOrder,
  ordersRefetch,
  salesType,
}) => {
  const [formInstance] = Form.useForm();
  const [mode, setMode] = useState<FormModeType>(FormMode.SHOW);
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
    setShowOrder(null);
    setMode(FormMode.SHOW);
    formInstance.resetFields();
  };

  useOrderFormSync({ formInstance, showOrder });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      API.patchSalesOrders(data, showOrder?.docEntry as number),
    onSuccess: () => {
      toast.success("Order Yangilandi");
      handleClose();
      ordersRefetch();
    },
  });

  const onFinished = (values: any) => {
    const payload = mapFormValuesToPayload(values, showOrder!);
    mutate(payload);
  };

  console.log("showOrder123", showOrder);

  return (
    <Modal
      title={
        <h3>
          <b>{t("general.docNumber")}</b> : {showOrder?.docNum}
        </h3>
      }
      open={open && !!showOrder}
      footer={null}
      onCancel={handleClose}
      width="90%"
    >
      <Form
        form={formInstance}
        className="sales_order_edit_or_show"
        onFinish={onFinished}
      >
        <ErrorBoundary>
          <SalesOrderHeader salesType={salesType} />
        </ErrorBoundary>

        <div className="sales_order_edit_or_show__main">
          <ErrorBoundary>
            <SalesOrderItemsTable formInstance={formInstance} mode={mode} />
          </ErrorBoundary>
        </div>

        {(salesType === "sales" || salesType === "order") && (
          <ErrorBoundary>
            <SalesOrderFooter
              orderEditLoading={isPending}
              handleClose={handleClose}
              form={formInstance}
              mode={mode}
              setMode={setMode}
              showOrder={showOrder}
              ordersRefetch={ordersRefetch}
              salesType={salesType}
            />
          </ErrorBoundary>
        )}
      </Form>
    </Modal>
  );
};

export default SalesOrderEditOrShow;
