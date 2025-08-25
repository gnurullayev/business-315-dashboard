import { Button, DatePicker, Form, Input } from "antd";
import { UniversalSelect } from "@/components";
import { Plus } from "lucide-react";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import { Currencies } from "@/enums";
import ClientModalForm from "@/features/clients/components/ClientModalForm";
import { useState, type FC } from "react";
interface IProps {}

const currencyOptions = [
  { value: Currencies.UZS, label: "UZS" },
  { value: Currencies.USD, label: "USD" },
];

const SalesOrderHeader: FC<IProps> = () => {
  const { t } = useTranslation();
  const [clientModalFormOpen, setClientModalFormOpen] =
    useState<boolean>(false);
  const [customerReload, setCustomerReload] = useState(0);

  return (
    <div className="order_create_form__header">
      <div className="order_create_form__item order_create_form__card_code_box">
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
          reload={customerReload}
          rules={[{ required: true, message: t("general.enterInformation") }]}
        />
        <Button
          type="primary"
          className="order_create_form__card_code_add"
          onClick={() => setClientModalFormOpen(true)}
        >
          <Plus />
        </Button>
        <ClientModalForm
          open={clientModalFormOpen}
          setOpen={setClientModalFormOpen}
          setReload={setCustomerReload}
        />
      </div>

      <div className="order_create_form__item">
        <Form.Item
          name="dollarRate"
          label={t("sales.dollarRate")}
          layout="vertical"
        >
          <Input disabled allowClear />
        </Form.Item>
      </div>

      <div className="order_create_form__item">
        <Form.Item
          name="date"
          label={t("sales.date")}
          layout="vertical"
          rules={[{ required: true, message: t("general.enterInformation") }]}
        >
          <DatePicker placeholder={t("general.choose")} format="MM/DD/YYYY" />
        </Form.Item>
      </div>

      <div className="order_create_form__item">
        <Form.Item
          name="term"
          label={t("sales.term")}
          layout="vertical"
          rules={[{ required: true, message: t("general.enterInformation") }]}
        >
          <DatePicker placeholder={t("general.choose")} format="MM/DD/YYYY" />
        </Form.Item>
      </div>

      <div className="form_item">
        <UniversalSelect
          name="docCurrency"
          label={t("sales.currency")}
          layout="vertical"
          placeholder={t("general.choose")}
          minWidth="80px"
          manualOptions={currencyOptions}
          rules={[{ required: true, message: t("general.enterInformation") }]}
        />
      </div>
    </div>
  );
};

export default SalesOrderHeader;
