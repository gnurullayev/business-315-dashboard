import { DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";

export const PaymentFormItems = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="payment-modal-form__item_box">
        <Form.Item
          name="docRate"
          label={t("general.dollarRate")}
          rules={[
            { required: true, message: t("general.enterInformation") },
            { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"date"}
          label={t("general.date")}
          rules={[{ required: true, message: t("general.enterInformation") }]}
        >
          <DatePicker placeholder={t("general.choose")} format="MM/DD/YYYY" />
        </Form.Item>
      </div>

      <div className="payment-modal-form__item_box">
        <Form.Item
          name="USD"
          label={t("purchases.usd")}
          rules={[
            { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
          ]}
        >
          <Input placeholder="USD summa" />
        </Form.Item>
        <Form.Item name="u_CashAccount" label={t("purchases.cash")}>
          <Input disabled />
        </Form.Item>
      </div>

      <div className="payment-modal-form__item_box">
        <Form.Item
          name="UZS"
          label={t("purchases.uzs")}
          rules={[
            { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
          ]}
        >
          <Input placeholder="UZS summa" />
        </Form.Item>
        <Form.Item name="u_CashAccountUZS" label={t("purchases.cash")}>
          <Input disabled />
        </Form.Item>
      </div>

      <div className="payment-modal-form__item_box">
        <Form.Item
          name="card"
          label={t("purchases.click")}
          rules={[
            { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
          ]}
        >
          <Input placeholder="Card summa" />
        </Form.Item>
        <Form.Item name="u_CardAccount" label={t("purchases.cash")}>
          <Input disabled />
        </Form.Item>
      </div>

      <Form.Item name="totalAmount" label={t("general.totalAmount")}>
        <Input disabled />
      </Form.Item>

      <div className="payment-modal-form__comment">
        <Form.Item name={"comment"} label={t("general.comment")}>
          <TextArea rows={4} />
        </Form.Item>
      </div>
    </>
  );
};
