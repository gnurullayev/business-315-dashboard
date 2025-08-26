import { Button, Form, Input, Table } from "antd";
import { UniversalSelect } from "@/components";
import { Minus, Plus } from "lucide-react";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import type { FormModeType } from "@/types";
import type { FC } from "react";
import { FormMode } from "@/enums";
import type { StockType } from "../../types";
interface IProps {
  mode: FormModeType;
  stockType: StockType;
}

const StockFormModalCreateTable: FC<IProps> = ({ mode, stockType }) => {
  const { t } = useTranslation();
  const isDisabled = stockType !== "stock-products";

  return (
    <div className="stock_form_create__table">
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
                  minWidth="500px"
                  disabled={isDisabled}
                  rules={[
                    {
                      required: true,
                      message: t("general.enterInformation"),
                    },
                  ]}
                  className={isDisabled ? "hide-and-disabled" : ""}
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
                  <Input
                    min={1}
                    disabled={isDisabled}
                    className={isDisabled ? "hide-and-disabled" : ""}
                  />
                </Form.Item>
              ),
            },
            {
              title: t("stock.unitOfMeasurement"),
              dataIndex: "unitOfMeasurement",
              render: (_: any, __: any, index: number) => (
                <Form.Item name={[index, "uoMCode"]}>
                  <Input min={1} className="hide-and-disabled" disabled />
                </Form.Item>
              ),
            },
            ...(mode === FormMode.CREATE
              ? [
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
                ]
              : []),
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

export default StockFormModalCreateTable;
