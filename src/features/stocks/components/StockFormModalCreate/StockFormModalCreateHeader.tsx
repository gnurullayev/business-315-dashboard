import { DatePicker, Form } from "antd";
import { UniversalSelect } from "@/components";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import { type FC } from "react";
import type { FormModeType } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
interface IProps {
  mode: FormModeType;
}

const StockFormModalCreateHeader: FC<IProps> = ({ mode }) => {
  const { t } = useTranslation();
  const userInfo = useSelector((store: RootState) => store.userData);

  return (
    <div className="order_create_form__header">
      <div className="order_create_form__item">
        <UniversalSelect
          name={"fromWarehouseCode"}
          placeholder={t("general.choose")}
          label={t("stock.fromWarehouse")}
          layout="vertical"
          required={true}
          request={API.getWarehouses}
          requestQueryKey={`fromWarehouse`}
          resDataKey="data"
          valueKey="warehouseCode"
          labelKey="warehouseName"
          isDefaultValue={true}
          disabled={true}
          minWidth="170px"
          rules={[
            {
              required: true,
              message: t("general.enterInformation"),
            },
          ]}
        />
      </div>

      <div className="order_create_form__item">
        <UniversalSelect
          name={"toWarehouseCode"}
          placeholder={t("general.choose")}
          label={t("stock.toWarehouse")}
          layout="vertical"
          required={true}
          request={API.getWarehouses}
          requestQueryKey={`toWarehouse`}
          resDataKey="data"
          valueKey="warehouseCode"
          labelKey="warehouseName"
          isDefaultValue={true}
          minWidth="170px"
          disabled={mode !== "CREATE"}
          filteredOptionsCallback={(option: any) =>
            option.value !== userInfo.wareHouse
          }
          rules={[
            {
              required: true,
              message: t("general.enterInformation"),
            },
          ]}
        />
      </div>

      <div className="order_create_form__item">
        <Form.Item
          name="docDate"
          label={t("sales.date")}
          layout="vertical"
          rules={[{ required: true, message: t("general.enterInformation") }]}
        >
          <DatePicker
            placeholder={t("general.choose")}
            disabled={mode !== "CREATE"}
            format="MM/DD/YYYY"
          />
        </Form.Item>
      </div>
      <div className="order_create_form__item">
        <Form.Item
          name="dueDate"
          label={t("sales.term")}
          layout="vertical"
          rules={[{ required: true, message: t("general.enterInformation") }]}
        >
          <DatePicker
            placeholder={t("general.choose")}
            disabled={mode !== "CREATE"}
            format="MM/DD/YYYY"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default StockFormModalCreateHeader;
