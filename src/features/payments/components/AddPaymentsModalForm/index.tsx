import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { UniversalSelect } from "@/components";
import TextArea from "antd/es/input/TextArea";
import "./styles.scss";
import type { PaymentsType } from "../../types";
import { Currencies } from "@/enums";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const currencyOptions = [
  { value: Currencies.UZS, label: "UZS" },
  { value: Currencies.USD, label: "USD" },
];

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<number>>;
  paymentsType: PaymentsType;
}

const AddPaymentsModalForm: FC<IProps> = ({
  open,
  setOpen,
  setReload,
  paymentsType,
}) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();
  const userInfo = useSelector((store: RootState) => store.userData);
  const { data: docRate } = useQuery({
    queryKey: ["getCurrencyRate"],
    queryFn: async () => await API.getCurrencyRate(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      if (paymentsType === "incoming") return API.postIncomingPayment(data);
      return API.postVendorPayment(data);
    },
    onSuccess: () => {
      toast.success(
        paymentsType === "incoming"
          ? "Kirim to'lov yaratildi"
          : "Chiqim to'lov yaratildi"
      );
      formInstance.resetFields();
      setReload((prev) => prev + 1);
      setOpen(false);
    },
  });

  useEffect(() => {
    if (open) {
      formInstance.setFieldValue("docRate", docRate);
      formInstance.setFieldValue("docCurrency", Currencies.USD);
      formInstance.setFieldValue("docDate", dayjs());
      if (paymentsType === "outgoing") {
        formInstance.setFieldValue("cardCode", userInfo.u_CashAccount);
      } else {
        formInstance.setFieldValue("cashAccount", userInfo.u_CashAccount);
      }
    }
  }, [open, formInstance]);

  const onFinished = (values: any) => {
    const data = {
      cashAccount: values.cashAccount,
      docDate: dayjs(values.docDate).format("YYYY-MM-DD"),
      cardCode: values.cardCode,
      docCurrency: values.docCurrency,
      cashSum: values.cashSum,
      remarks: values.remarks ? values.remarks : "",
      docRate: values.docRate ? values.docRate : 0,
      docType: paymentsType === "incoming" ? "C" : "A",
    };
    mutate(data);
  };

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
  };

  return (
    <Modal
      title={
        <h3>
          <b>
            {t(
              `payments.${
                paymentsType === "incoming" ? "addInputFees" : "addOutputFees"
              }`
            )}
          </b>
        </h3>
      }
      open={open}
      footer={null}
      onCancel={handleClose}
      width="50%"
    >
      <Form
        form={formInstance}
        className="add_payments_form"
        onFinish={onFinished}
        layout="vertical"
      >
        <div className="add_payments_form__inner">
          <div className="add_payments_form__item_box_first">
            <Form.Item
              name="docRate"
              label={t("general.dollarRate")}
              layout="vertical"
              rules={[
                { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
              ]}
            >
              <Input placeholder={t("general.dollarRate")} />
            </Form.Item>

            <UniversalSelect
              name="docCurrency"
              label={t("sales.currency")}
              layout="vertical"
              placeholder={t("general.choose")}
              minWidth="80px"
              manualOptions={currencyOptions}
              rules={[
                { required: true, message: t("general.enterInformation") },
              ]}
            />

            <Form.Item
              name={"docDate"}
              label={t("general.date")}
              layout="vertical"
              rules={[
                { required: true, message: t("general.enterInformation") },
              ]}
            >
              <DatePicker
                placeholder={t("general.choose")}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </div>

          <div className="add_payments_form__item_box">
            {paymentsType === "incoming" && (
              <>
                <UniversalSelect
                  name="cardCode"
                  label={t("sales.customerName")}
                  layout="vertical"
                  placeholder={t("general.choose")}
                  required
                  params={{ cardType: "C" }}
                  request={API.getBusinessPartners}
                  requestQueryKey={"getBusinessPartners"}
                  paramKey="cardName"
                  resDataKey="data"
                  valueKey="cardCode"
                  labelKey="cardName"
                  showSearch
                  minWidth="200px"
                  className="add_payments_form__card_code"
                  rules={[
                    { required: true, message: t("general.enterInformation") },
                  ]}
                />

                <Form.Item
                  name="cashAccount"
                  label={t("payments.incomingCash")}
                  layout="vertical"
                >
                  <Input disabled />
                </Form.Item>
              </>
            )}

            {paymentsType === "outgoing" && (
              <>
                <UniversalSelect
                  name="cardCode"
                  label={t("payments.incomingCash")}
                  layout="vertical"
                  placeholder={t("general.choose")}
                  required
                  paramKey="acctName"
                  request={API.getCashAccounts}
                  requestQueryKey={"incomingCashAccount"}
                  resDataKey="data"
                  valueKey="acctCode"
                  labelKey="acctName"
                  showSearch
                  minWidth="200px"
                  className="add_payments_form__card_code"
                  rules={[
                    { required: true, message: t("general.enterInformation") },
                  ]}
                />
                <UniversalSelect
                  name="cashAccount"
                  label={t("payments.outgoingCash")}
                  layout="vertical"
                  placeholder={t("general.choose")}
                  required
                  paramKey="acctName"
                  request={API.getCashAccounts}
                  requestQueryKey={"outgoingCashAccount"}
                  resDataKey="data"
                  valueKey="acctCode"
                  labelKey="acctName"
                  showSearch
                  minWidth="200px"
                  className="add_payments_form__card_code"
                  rules={[
                    { required: true, message: t("general.enterInformation") },
                  ]}
                />
              </>
            )}
          </div>

          <Form.Item
            name="cashSum"
            label={t("general.amount")}
            layout="vertical"
            rules={[
              { required: true, message: t("general.enterInformation") },
              { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
            ]}
          >
            <Input placeholder={t("general.amount")} min={0} />
          </Form.Item>

          <div className="add_payments_form__comment">
            <Form.Item
              name={"remarks"}
              label={t("general.comment")}
              layout="vertical"
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <div className="add_payments_form__footer">
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

export default AddPaymentsModalForm;
