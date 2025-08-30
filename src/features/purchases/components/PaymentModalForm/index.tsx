import { Button, Form, Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { IOrder } from "@/types/order";
import "./styles.scss";
import { usePaymentMutation } from "../../hooks/usePaymentMutation";
import { buildPayments, calcTotalAmount } from "../../lib/idex";
import { PaymentFormItems } from "./PaymentFormItems";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import type { PurchasesOrSalesType } from "../../types";
import type { RootState } from "@/store";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  setReload: (cb: (prev: number) => number) => void;
  showPurchase?: IOrder;
  paymentSuccessShowFn?: (a: string | null) => void;
  purchasesOrSales?: PurchasesOrSalesType;
}

const PaymentModalForm = ({
  open,
  setOpen,
  setReload,
  showPurchase,
  paymentSuccessShowFn,
  purchasesOrSales = "purchase",
}: IProps) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();
  const userInfo = useSelector((store: RootState) => store.userData);

  const { data: docRate } = useQuery({
    queryKey: ["get-currency-rate"],
    queryFn: async () => await API.getCurrencyRate(),
  });
  const { mutate, isPending } = usePaymentMutation({
    showOrder: showPurchase,
    paymentSuccessShowFn,
    formInstance,
    setReload,
    setOpen,
  });

  const onFinished = (values: any) => {
    const payments = buildPayments(values, userInfo);
    if (payments.length === 0) {
      toast.error("To'lov summasini kiriting");
      return;
    }

    if (showPurchase) {
      mutate({
        cardCode: showPurchase.cardCode,
        docDate: values.date,
        docEntry: showPurchase.docEntry,
        docRate: values.docRate,
        payments,
      });
    }
  };

  const onValuesChange = (values: any) => {
    const USD = Number(formInstance.getFieldValue("USD"));
    const UZS = Number(formInstance.getFieldValue("UZS"));
    const card = Number(formInstance.getFieldValue("card"));
    const docRate = Number(formInstance.getFieldValue("docRate"));

    const keys = Object.keys(values);
    if (["USD", "UZS", "card"].includes(keys[0])) {
      const totalAmount = calcTotalAmount(USD, UZS, card, docRate);
      formInstance.setFieldValue("totalAmount", totalAmount);
    }
  };

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
    if (paymentSuccessShowFn) paymentSuccessShowFn(null);
  };

  useEffect(() => {
    if (showPurchase) {
      formInstance.setFieldsValue({
        docRate: docRate ?? 0,
        u_CashAccount: userInfo.u_CashAccount,
        u_CashAccountUZS: userInfo.u_CashAccountUZS,
        u_CardAccount: userInfo.u_CardAccount,
        totalAmount: 0,
      });
    }
  }, [showPurchase, docRate, userInfo, formInstance]);

  return (
    <Modal
      title={
        <h3>
          <b>
            {t("general.docNumber")}: {showPurchase?.docNum}
          </b>
        </h3>
      }
      open={open}
      footer={null}
      onCancel={handleClose}
      width="40%"
    >
      <Form
        form={formInstance}
        className="payment-modal-form"
        onFinish={onFinished}
        onValuesChange={onValuesChange}
        layout="vertical"
      >
        <div className="payment-modal-form__inner">
          <PaymentFormItems />

          <div className="payment-modal-form__footer">
            <Button type="default" onClick={handleClose}>
              {t("general.back")}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={isPending}
            >
              {t(`general.${purchasesOrSales === "purchase" ? "add" : "pay"}`)}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default PaymentModalForm;
