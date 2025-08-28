import { type FC } from "react";
import type { IReportsFilter } from "../../types";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { createStyles } from "antd-style";
import { Table } from "antd";
import { useGetReports } from "../../hooks/useGetReports";
import Loader from "@/components/Loader";

const useStyle = createStyles(({ css, token }: any) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

interface IProps {
  filter: IReportsFilter;
}

const columns: any = (t: any) => {
  return [
    {
      title: t("general.productName"),
      dataIndex: "itemName",
      key: "itemName",
      width: 300,
      fixed: "left",
    },
    {
      title: t("reports.groupName"),
      dataIndex: "groupName",
      key: "groupName",
      width: 150,
    },
    {
      title: t("general.totalAmount"),
      dataIndex: "inStockTotal",
      key: "inStockTotal",
      width: 150,
    },
    {
      title: t("reports.defaultWarehouse"),
      children: [
        {
          title: t("general.quantity"),
          dataIndex: ["warehouseDefault", "inStock"],
          key: "default_inStock",
          width: 120,
        },
        {
          title: t("reports.reservation"),
          dataIndex: ["warehouseDefault", "ordered"],
          key: "default_ordered",
          width: 120,
        },
        {
          title: t("reports.kg"),
          dataIndex: ["warehouseDefault", "weight"],
          key: "default_weight",
          width: 120,
        },
      ],
    },
    {
      title: t("reports.mainWarehouse"),
      children: [
        {
          title: t("general.quantity"),
          dataIndex: ["warehouseMain", "inStock"],
          key: "warehouseMain_inStock",
          width: 120,
        },
        {
          title: t("reports.reservation"),
          dataIndex: ["warehouseMain", "ordered"],
          key: "warehouseMain_ordered",
          width: 120,
        },
        {
          title: t("reports.kg"),
          dataIndex: ["warehouseMain", "weight"],
          key: "warehouseMain_weight",
          width: 120,
        },
      ],
    },
    {
      title: t("reports.rawMaterialWarehouse"),
      children: [
        {
          title: t("general.quantity"),
          dataIndex: ["rawMaterialWarehouse", "inStock"],
          key: "rawMaterialWarehouse_inStock",
          width: 120,
        },
        {
          title: t("reports.reservation"),
          dataIndex: ["rawMaterialWarehouse", "ordered"],
          key: "rawMaterialWarehouse_ordered",
          width: 120,
        },
        {
          title: t("reports.kg"),
          dataIndex: ["rawMaterialWarehouse", "weight"],
          key: "rawMaterialWarehouse_weight",
          width: 120,
        },
      ],
    },
  ];
};

const ReportsList: FC<IProps> = ({ filter }) => {
  const { t } = useTranslation();
  const { reportsData, isLoading } = useGetReports(filter);

  const { styles } = useStyle();

  return (
    <div className="reports_list page_layout">
      {isLoading && !reportsData ? (
        <Loader />
      ) : (
        <Table
          className={styles.customTable}
          columns={columns(t)}
          dataSource={reportsData}
          bordered
          size="middle"
          scroll={{ x: "max-content" }}
          sticky={{ offsetHeader: 0 }}
          pagination={false}
        />
      )}
    </div>
  );
};

export default ReportsList;
