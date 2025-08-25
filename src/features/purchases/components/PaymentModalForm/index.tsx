import { Button, Form, Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { IOrder } from "@/types/order";
import type { User } from "@/types/user";
import "./styles.scss";
import { usePaymentMutation } from "../../hooks/usePaymentMutation";
import { buildPayments, calcTotalAmount } from "../../lib/idex";
import { PaymentFormItems } from "./PaymentFormItems";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  setReload: (cb: (prev: number) => number) => void;
  showOrder?: IOrder;
  paymentSuccessShowFn?: (a: string | null) => void;
}

const PaymentModalForm = ({
  open,
  setOpen,
  setReload,
  showOrder,
  paymentSuccessShowFn,
}: IProps) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();
  const userInfo: User = useSelector((store: any) => store.userData.user);

  const { data: docRate } = useQuery({
    queryKey: ["get-currency-rate"],
    queryFn: async () => await API.getCurrencyRate(),
  });
  const { mutate, isPending } = usePaymentMutation({
    showOrder,
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

    if (showOrder) {
      mutate({
        cardCode: showOrder.cardCode,
        docDate: values.date,
        docEntry: showOrder.docEntry,
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

  console.log("showOrder", showOrder);
  useEffect(() => {
    if (showOrder) {
      formInstance.setFieldsValue({
        docRate: docRate ?? 0,
        u_CashAccount: userInfo.u_CashAccount,
        u_CashAccountUZS: userInfo.u_CashAccountUZS,
        u_CardAccount: userInfo.u_CardAccount,
        totalAmount: 0,
      });
    }
  }, [showOrder, docRate, userInfo, formInstance]);

  return (
    <Modal
      title={
        <h3>
          <b>
            {t("general.docNumber")}: {showOrder?.docNum}
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
              {t("general.add")}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default PaymentModalForm;
