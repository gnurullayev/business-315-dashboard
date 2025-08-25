import { Form, Modal } from "antd";
import SalesOrderItemsTable from "./PurchaseShowModalTable";
import SalesOrderFooter from "./PurchaseShowModalFooter";
import "./styles.scss";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormMode } from "@/enums";
import type { FormModeType } from "@/types";
import type { IOrder } from "@/types/order";
import { useShowPurchaseFormSync } from "../../hooks/useShowPurchaseFormSync";
import type { PurchasesFormType } from "../../types";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showPurchase: IOrder | null;
  setShowPurchase: Dispatch<SetStateAction<any>>;
  purchaseRefetch: any;
  purchasesType: PurchasesFormType;
}

const PurchaseShowModal: FC<IProps> = ({
  open,
  setOpen,
  showPurchase,
  setShowPurchase,
  purchasesType,
}) => {
  const [formInstance] = Form.useForm();
  const [_, setMode] = useState<FormModeType>(FormMode.SHOW);
  const handleClose = () => {
    setOpen(false);
    setShowPurchase(null);
    setMode(FormMode.SHOW);
    formInstance.resetFields();
  };

  useShowPurchaseFormSync({ formInstance, showPurchase });

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["edit-sales-order"],
  //   mutationFn: (data: any) =>
  //     API.patchSalesOrders(data, showPurchase?.docEntry as number),
  //   onSuccess: () => {
  //     toast.success("Order Yangilandi");
  //     handleClose();
  //     purchaseRefetch();
  //   },
  // });

  const onFinished = (_: any) => {
    // const payload = mapFormValuesToPayload(values, showPurchase!);
    // mutate(payload);
  };

  return (
    <Modal
      title={
        <h3>
          <b>Hujjat raqami</b> : {showPurchase?.docNum}
        </h3>
      }
      open={open && !!showPurchase}
      footer={null}
      onCancel={handleClose}
      width="80%"
    >
      <Form
        form={formInstance}
        className="sales_order_edit_or_show"
        onFinish={onFinished}
      >
        <div className="sales_order_edit_or_show__main">
          <SalesOrderItemsTable purchasesType={purchasesType} />
        </div>

        {purchasesType === "purchaseInvoices" && (
          <SalesOrderFooter handleClose={handleClose} />
        )}
      </Form>
    </Modal>
  );
};

export default PurchaseShowModal;
