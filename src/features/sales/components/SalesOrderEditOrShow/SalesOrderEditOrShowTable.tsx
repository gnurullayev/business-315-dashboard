import { Form, Input, Table } from "antd";
import { UniversalSelect } from "@/components";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import { FormMode } from "@/enums";

const SalesOrderEditOrShowTable = ({ mode, formInstance }: any) => {
  const { t } = useTranslation();

  return (
    <div className="sales_order_edit_or_show__table">
      <Form.List name="items">
        {(fields) => {
          const columns = [
            {
              title: t("sales.productName"),
              dataIndex: "itemName",
              render: (_: any, __: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);

                return mode == FormMode.SHOW ? (
                  <span>{data?.itemDescription}</span>
                ) : (
                  <UniversalSelect
                    name={[index, "itemCode"]}
                    placeholder={t("general.choose")}
                    params={{ pageSize: 100000, skip: 0 }}
                    request={API.getInventoryItems}
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
                );
              },
            },
            {
              title: t("sales.quantity"),
              dataIndex: "quantity",
              render: (_: any, __: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);

                return mode == FormMode.SHOW ? (
                  <span>{data?.quantity}</span>
                ) : (
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
                );
              },
            },
            {
              title: t("sales.price"),
              dataIndex: "price",
              render: (_: any, __: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);

                return mode == FormMode.SHOW ? (
                  <span>{data?.price}</span>
                ) : (
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
                );
              },
            },
            {
              title: t("sales.currency"),
              dataIndex: "currency",
              render: (__: any, _: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);
                return <span>{data?.currency}</span>;
              },
            },
            {
              title: t("sales.warehouseName"),
              dataIndex: "warehouseName",
              render: (__: any, _: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);
                return <span>{data?.whsName}</span>;
              },
            },

            {
              title: t("sales.cell"),
              dataIndex: "cell",
              render: (__: any, _: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);
                const binCode = data?.binLocations?.length
                  ? data?.binLocations[0]?.binCode
                  : data?.u_BinCode;

                return <span>{binCode}</span>;
              },
            },
            {
              title: t("sales.totalAmount"),
              dataIndex: "totalAmount",
              render: (__: any, _: any, index: number) => {
                const data = formInstance.getFieldValue([
                  "items",
                  index,
                  "data",
                ]);
                return <span>{data?.lineTotal}</span>;
              },
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

export default SalesOrderEditOrShowTable;
