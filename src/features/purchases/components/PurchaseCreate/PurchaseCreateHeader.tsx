import { Button, DatePicker, Form, Input } from "antd";
import { UniversalSelect } from "@/components";
import { Plus } from "lucide-react";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import { Currencies } from "@/enums";
import ClientModalForm from "@/features/clients/components/ClientModalForm";
import { useState, type FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
interface IProps {}

const currencyOptions = [
  { value: Currencies.UZS, label: "UZS" },
  { value: Currencies.USD, label: "USD" },
];

const PurchaseCreateHeader: FC<IProps> = () => {
  const userInfo = useSelector((store: RootState) => store.userData);

  const { t } = useTranslation();
  const [clientModalFormOpen, setClientModalFormOpen] =
    useState<boolean>(false);
  const [customerReload, setCustomerReload] = useState(0);

  return (
    <div className="purchase_create_form__header">
      <div className="purchase_create_form__item purchase_create_form__card_code_box">
        <UniversalSelect
          name="cardCode"
          label={t("sales.customerName")}
          layout="vertical"
          placeholder={t("general.choose")}
          required
          params={{ cardType: "S" }}
          request={API.getBusinessPartners}
          requestQueryKey={"getBusinessPartners"}
          paramKey="cardName"
          resDataKey="data"
          valueKey="cardCode"
          labelKey="cardName"
          showSearch
          minWidth="200px"
          className="purchase_create_form__card_code"
          reload={customerReload}
          rules={[{ required: true, message: t("general.enterInformation") }]}
        />
        <Button
          type="primary"
          className="purchase_create_form__card_code_add"
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

      <div className="purchase_create_form__item">
        <Form.Item
          name="dollarRate"
          label={t("sales.dollarRate")}
          layout="vertical"
        >
          <Input disabled allowClear />
        </Form.Item>
      </div>

      <div className="purchase_create_form__item">
        <Form.Item
          name="date"
          label={t("sales.date")}
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
      <div className="form_item">
        <UniversalSelect
          name="slpCode"
          label={t("sales.salesManager")}
          layout="vertical"
          placeholder={t("general.choose")}
          required={true}
          request={API.getSalesEmployees}
          requestQueryKey={"getSalesEmployees"}
          resDataKey="data"
          valueKey="slpCode"
          labelKey="slpName"
          className="purchase_create_form__sales_manager"
          disabled={!!userInfo.salesPersonCode}
          rules={[{ required: true, message: t("general.enterInformation") }]}
        />
      </div>
    </div>
  );
};

export default PurchaseCreateHeader;
