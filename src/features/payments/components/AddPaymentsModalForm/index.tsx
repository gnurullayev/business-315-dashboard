import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { UniversalSelect } from "@/components";
import TextArea from "antd/es/input/TextArea";
import "./styles.scss";
import type { PaymentsType } from "../../types";
import { Currencies } from "@/enums";

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

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-business-partners"],
    mutationFn: (data: any) => API.postBusinessPartners(data),
    onSuccess: () => {
      toast.success("Client yaratildi");
      formInstance.resetFields();
      setReload((prev) => prev + 1);
      setOpen(false);
    },
    onError: (err: any) => {
      if (err?.response?.data?.message) {
        toast.error(`Xatolik yuz berdi: ${err?.response?.data?.message}`);
      } else {
        toast.error(`Xatolik yuz berdi: ${err.message}`);
      }
    },
  });

  const onFinished = (values: any) => {
    mutate(values);
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
              name="dollarRate"
              label={t("general.dollarRate")}
              layout="vertical"
              rules={[
                { required: true, message: t("general.enterInformation") },
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
              name={"date"}
              label={t("general.date")}
              layout="vertical"
              rules={[]}
            >
              <DatePicker
                placeholder={t("general.choose")}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </div>

          <div className="add_payments_form__item_box">
            {paymentsType === "incoming" && (
              <UniversalSelect
                name="cardCode"
                label={t("sales.customerName")}
                layout="vertical"
                placeholder={t("general.choose")}
                required
                params={{ cardType: "C" }}
                request={API.getBusinessPartners}
                paramKey="cardName"
                resDataKey="data"
                valueKey="cardCode"
                labelKey="cardName"
                showSearch
                minWidth="200px"
                className="order_create_form__card_code"
                rules={[
                  { required: true, message: t("general.enterInformation") },
                ]}
              />
            )}

            <UniversalSelect
              name="incomingCash"
              label={t("payments.incomingCash")}
              layout="vertical"
              placeholder={t("general.choose")}
              required
              params={{ cardType: "C" }}
              request={API.getBusinessPartners}
              paramKey="cardName"
              resDataKey="data"
              valueKey="cardCode"
              labelKey="cardName"
              showSearch
              minWidth="200px"
              className="order_create_form__card_code"
              disabled={paymentsType === "incoming"}
              rules={[
                { required: true, message: t("general.enterInformation") },
              ]}
            />

            {paymentsType === "outgoing" && (
              <UniversalSelect
                name="outgoingCash"
                label={t("payments.outgoingCash")}
                layout="vertical"
                placeholder={t("general.choose")}
                required
                params={{ cardType: "C" }}
                request={API.getBusinessPartners}
                paramKey="cardName"
                resDataKey="data"
                valueKey="cardCode"
                labelKey="cardName"
                showSearch
                minWidth="200px"
                className="order_create_form__card_code"
                rules={[
                  { required: true, message: t("general.enterInformation") },
                ]}
              />
            )}
          </div>

          <Form.Item
            name="amount"
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
              name={"comment"}
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
