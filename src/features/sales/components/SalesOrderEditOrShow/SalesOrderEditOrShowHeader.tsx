import { UniversalSelect } from "@/components";
import { API } from "@/services/api";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { SalesFormType } from "../../types";

interface IProps {
  salesType: SalesFormType;
}
const SalesOrderEditOrShowHeader: FC<IProps> = ({ salesType }) => {
  const { t } = useTranslation();
  return (
    <div className="sales_order_edit_or_show__header">
      <div className="sales_order_edit_or_show__item sales_order_edit_or_show__card_code_box">
        <UniversalSelect
          name="cardCode"
          label={t("sales.customerName")}
          layout="vertical"
          placeholder={t("general.choose")}
          params={{ cardType: "C" }}
          request={API.getBusinessPartners}
          paramKey="cardName"
          resDataKey="data"
          valueKey="cardCode"
          labelKey="cardName"
          minWidth="200px"
          disabled
        />
      </div>

      <div className="sales_order_edit_or_show__item">
        <Form.Item name="docDate" label={t("sales.date")} layout="vertical">
          <Input placeholder={t("general.choose")} disabled />
        </Form.Item>
      </div>

      <div className="sales_order_edit_or_show__item">
        <Form.Item name="docDueDate" label={t("sales.term")} layout="vertical">
          <Input placeholder={t("general.choose")} disabled />
        </Form.Item>
      </div>

      <div className="form_item">
        <Form.Item
          name="docTotal"
          label={t("sales.docTotalAmount")}
          layout="vertical"
        >
          <Input placeholder={t("general.choose")} disabled />
        </Form.Item>
      </div>
      {salesType === "sales" && (
        <div className="form_item">
          <Form.Item
            name="paidSum"
            label={t("sales.Umumiy to'langan summa")}
            layout="vertical"
          >
            <Input placeholder={t("general.choose")} disabled />
          </Form.Item>
        </div>
      )}
    </div>
  );
};

export default SalesOrderEditOrShowHeader;
