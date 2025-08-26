import { Button, Form, Input, Table } from "antd";
import { UniversalSelect } from "@/components";
import { Minus, Plus } from "lucide-react";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";

const PurchaseCreateTable = () => {
  const { t } = useTranslation();

  return (
    <div className="order_create_form__table">
      <Form.List name="items">
        {(fields, { add, remove }) => {
          const columns = [
            {
              title: t("sales.productName"),
              dataIndex: "itemName",
              render: (_: any, __: any, index: number) => (
                <UniversalSelect
                  name={[index, "itemCodes"]}
                  placeholder={t("general.choose")}
                  params={{ pageSize: 100000, skip: 0 }}
                  request={API.getItemsData}
                  requestQueryKey={`getItemsData-${index}`}
                  paramKey={"itemName"}
                  resDataKey="data"
                  valueKey="itemCode"
                  labelKey="itemName"
                  showSearch={true}
                  minWidth="320px"
                  rules={[
                    {
                      required: true,
                      message: t("general.enterInformation"),
                    },
                  ]}
                />
              ),
            },
            {
              title: t("sales.quantity"),
              dataIndex: "quantity",
              render: (_: any, __: any, index: number) => (
                <Form.Item
                  name={[index, "quantity"]}
                  style={{ margin: 0 }}
                  rules={[
                    {
                      required: true,
                      message: t("general.enterInformation"),
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: t("general.enterOnlyNumber"),
                    },
                  ]}
                >
                  <Input min={1} />
                </Form.Item>
              ),
            },
            {
              title: t("sales.price"),
              dataIndex: "price",
              render: (_: any, __: any, index: number) => (
                <Form.Item
                  name={[index, "price"]}
                  style={{ margin: 0 }}
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: t("general.enterOnlyNumber"),
                    },
                  ]}
                >
                  <Input min={0} />
                </Form.Item>
              ),
            },
            {
              title: t("sales.totalAmount"),
              dataIndex: "total",
              render: (_: any, __: any, index: number) => (
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    const qty =
                      getFieldValue(["items", index, "quantity"]) || 0;
                    const price = getFieldValue(["items", index, "price"]) || 0;

                    return <span>{qty * price}</span>;
                  }}
                </Form.Item>
              ),
            },
            {
              title: t("sales.warehouse"),
              dataIndex: "warehouse",
              render: (_: any, __: any, index: number) => (
                <UniversalSelect
                  name={[index, "warehouse"]}
                  placeholder={t("general.choose")}
                  required={true}
                  request={API.getWarehouses}
                  requestQueryKey={`getWarehouses-${index}`}
                  resDataKey="data"
                  valueKey="warehouseCode"
                  labelKey="warehouseName"
                  isDefaultValue={true}
                  minWidth="170px"
                />
              ),
            },
            {
              title: t("general.actions"),
              dataIndex: "actions",
              render: (_: any, __: any, index: number) => (
                <div style={{ display: "flex", gap: 4 }}>
                  <Button
                    type="primary"
                    icon={<Plus />}
                    onClick={() => add()}
                  />

                  {fields.length > 1 && (
                    <Button
                      danger
                      icon={<Minus />}
                      onClick={() => remove(index)}
                    />
                  )}
                </div>
              ),
            },
          ];

          const data = fields.map((field, index) => ({
            key: field.key,
            index,
          }));

          return (
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          );
        }}
      </Form.List>
    </div>
  );
};

export default PurchaseCreateTable;
