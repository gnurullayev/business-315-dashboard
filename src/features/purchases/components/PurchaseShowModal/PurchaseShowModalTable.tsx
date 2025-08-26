import { Form, Input, Table, type TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import type { PurchasesFormType } from "../../types";
import type { FC } from "react";
import type { IPurchaseDocumentLine } from "@/types/purchase";
interface IProps {
  purchasesType: PurchasesFormType;
  data: IPurchaseDocumentLine[];
}

const PurchaseShowModalTable: FC<IProps> = ({ purchasesType, data }) => {
  const { t } = useTranslation();
  const columns: TableColumnsType<any> = [
    {
      title: t("general.productName"),
      key: "itemDescription",
      dataIndex: "itemDescription",
    },
    {
      title: t("general.quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    ...(purchasesType === "purchaseInvoices"
      ? [
          {
            title: t("general.price"),
            dataIndex: "price",
            key: "price",
          },
          {
            title: t("general.currency"),
            dataIndex: "currency",
            key: "currency",
          },
          {
            title: t("general.totalAmount"),
            dataIndex: "lineTotal",
            key: "lineTotal",
          },
          {
            title: t("general.warehouseName"),
            dataIndex: "whsName",
            key: "whsName",
          },
        ]
      : []),
    ...(purchasesType === "purchasesReceiving"
      ? [
          {
            title: t("purchases.remainingNumber"),
            key: "remainingNumber",
            dataIndex: "remainingNumber",
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="sales_order_edit_or_show__header">
        <div className="sales_order_edit_or_show__item">
          <Form.Item
            name="docDate"
            label={t("purchases.supplier")}
            layout="vertical"
          >
            <Input placeholder={t("general.choose")} disabled />
          </Form.Item>
        </div>

        <div className="sales_order_edit_or_show__item">
          <Form.Item
            name="docDueDate"
            label={t("general.date")}
            layout="vertical"
          >
            <Input placeholder={t("general.choose")} disabled />
          </Form.Item>
        </div>
        {purchasesType === "purchaseInvoices" && (
          <div className="form_item">
            <Form.Item
              name="docTotal"
              label={t("general.totalAmount")}
              layout="vertical"
            >
              <Input placeholder={t("general.choose")} disabled />
            </Form.Item>
          </div>
        )}
      </div>

      <div className="sales_order_edit_or_show__table">
        <Table<any>
          columns={columns}
          dataSource={data}
          loading={false}
          pagination={false}
        />
      </div>
    </>
  );
};

export default PurchaseShowModalTable;
