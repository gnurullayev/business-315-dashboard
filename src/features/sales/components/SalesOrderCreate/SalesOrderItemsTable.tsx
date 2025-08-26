import { Button, Form, Input, Spin, Table } from "antd";
import { UniversalSelect } from "@/components";
import { Eye, Minus, Plus } from "lucide-react";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import WarehouseInfoModal from "./WarehouseInfoModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const SalesOrderItemsTable = ({
  formInstance,
  mutate,
  isPending,
  onhandItem,
}: any) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const userInfo = useSelector((store: RootState) => store.userData);

  return (
    <div className="order_create_form__main">
      <UniversalSelect
        name="slpCode"
        label={t("sales.salesManager")}
        layout="vertical"
        placeholder={t("general.choose")}
        required={true}
        request={API.getSalesEmployees}
        requestQueryKey={`getSalesEmployees`}
        resDataKey="data"
        valueKey="slpCode"
        labelKey="slpName"
        className="order_create_form__sales_manager"
        disabled={!!userInfo.salesPersonCode}
        rules={[{ required: true, message: t("general.enterInformation") }]}
      />
      <div className="order_create_form__table">
        <Form.List name="items">
          {(fields, { add, remove }) => {
            const columns = [
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
              {
                title: t("sales.productName"),
                dataIndex: "itemName",
                render: (_: any, __: any, index: number) => (
                  <UniversalSelect
                    name={[index, "itemCodes"]}
                    placeholder={t("general.choose")}
                    params={{ pageSize: 100000, skip: 0 }}
                    request={API.getInventoryItems}
                    requestQueryKey={`getInventoryItems-${index}`}
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
                    onSelect={(value: any, option: any) => {
                      const fullData = option?.itemObj;
                      formInstance.setFieldValue(
                        ["items", index, "itemCodesObj"],
                        fullData
                      );
                      if (fullData?.documentLines?.length) {
                        const warehouseCode =
                          fullData?.documentLines[0]?.warehouseCode;
                        formInstance.setFieldValue(
                          ["items", index, "warehouse"],
                          warehouseCode
                        );

                        mutate({
                          itemCodes: value,
                          warehouse: warehouseCode,
                        });
                      } else {
                        mutate({ itemCodes: value });
                      }
                    }}
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
                title: t("sales.quantityInStock"),
                dataIndex: "stockQty",
                render: (_: any, __: any) =>
                  isPending ? (
                    <Spin />
                  ) : (
                    <span>{onhandItem?.data[0]?.onHand}</span>
                  ),
              },
              {
                title: t("sales.confirmedQuantity"),
                dataIndex: "approvedQty",
                render: (_: any, __: any) =>
                  isPending ? (
                    <Spin />
                  ) : (
                    <span>{onhandItem?.data[0]?.available}</span>
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
                      const price =
                        getFieldValue(["items", index, "price"]) || 0;

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
                    onSelect={(value: any) => {
                      const itemCode = formInstance.getFieldValue([
                        "items",
                        index,
                        "itemCodes",
                      ]);

                      if (itemCode) {
                        mutate({
                          itemCodes: itemCode,
                          warehouse: value,
                        });
                      }
                    }}
                  />
                ),
              },
              {
                title: t("sales.cell"),
                dataIndex: "binLocation",
                render: (_: any, __: any, index: number) => {
                  const itemCodesObj = formInstance.getFieldValue([
                    "items",
                    index,
                    "itemCodesObj",
                  ]);
                  const warehouse = formInstance.getFieldValue([
                    "items",
                    index,
                    "warehouse",
                  ]);

                  let binLocations: any = [];

                  if (warehouse && itemCodesObj?.documentLines?.length) {
                    const documentLines = itemCodesObj?.documentLines?.find(
                      (item: any) => item.warehouseCode === warehouse
                    );
                    if (documentLines) {
                      binLocations = [...documentLines?.binLocations];
                    }
                  }

                  formInstance.setFieldValue(
                    ["items", index, "binLocation"],
                    binLocations
                  );

                  formInstance.setFieldValue(
                    ["items", index, "binAbsEntry"],
                    binLocations[0]?.binAbsEntry
                  );
                  const isDisabled = !binLocations?.length;

                  return (
                    <UniversalSelect
                      name={[index, "binAbsEntry"]}
                      placeholder={t("general.choose")}
                      manualOptions={binLocations.map((bin: any) => ({
                        value: bin?.binAbsEntry,
                        label: bin?.binCode,
                        itemObj: bin,
                      }))}
                      minWidth="100px"
                      disabled={isDisabled}
                    />
                  );
                },
              },
              {
                title: t("general.actions"),
                dataIndex: "actionsEnd",
                render: (_: any, __: any, index: number) => {
                  const itemCodesObj = formInstance.getFieldValue([
                    "items",
                    index,
                    "itemCodesObj",
                  ]);

                  return (
                    <>
                      <Button
                        disabled={!itemCodesObj}
                        type="primary"
                        onClick={() => setOpen(true)}
                      >
                        <Eye />
                      </Button>

                      <WarehouseInfoModal
                        open={open}
                        setOpen={setOpen}
                        data={{ ...itemCodesObj }}
                      />
                    </>
                  );
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
    </div>
  );
};

export default SalesOrderItemsTable;
