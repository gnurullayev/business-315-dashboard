import { Form, Modal } from "antd";
import SalesOrderItemsTable from "./PurchaseShowModalTable";
import SalesOrderFooter from "./PurchaseShowModalFooter";
import "./styles.scss";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormMode } from "@/enums";
import type { FormModeType } from "@/types";
import { useShowPurchaseFormSync } from "../../hooks/useShowPurchaseFormSync";
import type { PurchasesFormType } from "../../types";
import type { IPurchase } from "@/types/purchase";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showPurchase: IPurchase | null;
  setShowPurchase: Dispatch<SetStateAction<IPurchase | null>>;
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
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
    setShowPurchase(null);
    setMode(FormMode.SHOW);
    formInstance.resetFields();
  };

  useShowPurchaseFormSync({ formInstance, showPurchase });

  return (
    <Modal
      title={
        <h3>
          <b>{t("general.docNumber")}</b> : {showPurchase?.docNum}
        </h3>
      }
      open={open && !!showPurchase}
      footer={null}
      onCancel={handleClose}
      width="80%"
    >
      <Form form={formInstance} className="sales_order_edit_or_show">
        <div className="sales_order_edit_or_show__main">
          <SalesOrderItemsTable
            purchasesType={purchasesType}
            data={
              showPurchase?.documentLines ? showPurchase?.documentLines : []
            }
          />
        </div>

        {purchasesType === "purchaseInvoices" && (
          <SalesOrderFooter
            handleClose={handleClose}
            docEntry={showPurchase?.docEntry as number}
          />
        )}
      </Form>
    </Modal>
  );
};

export default PurchaseShowModal;
