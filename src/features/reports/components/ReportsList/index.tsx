import { useEffect, type FC } from "react";
import type { IReportsFilter } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { createStyles } from "antd-style";
import { Table } from "antd";

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
const data: any = [
  {
    key: "1",
    name: "TOVAR A",
    groupName: "Балон",
    totalQuantity: "81",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "2",
    name: "TOVAR B",
    groupName: "Балон2",
    totalQuantity: "81",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "3",
    name: "TOVAR c",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "4",
    name: "АШ 10.00R20 /280 ВТ168/265 Бото",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "5",
    name: "АШ 215/75R17.5 ВТ926 Бото",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 20, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "6",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "7",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "8",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "9",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "10",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "11",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
  {
    key: "12",
    name: "Диск колеса 22.5*7.50 SULTAN",
    totalQuantity: "81",
    groupName: "Балон3",
    skladDefault: { soni: 3, bron: 0, kg: 0 },
    skladMain: { soni: 3, bron: 0, kg: 0 },
    rawMaterialWarehouse: { soni: 3, bron: 0, kg: 0 },
  },
];

const columns: any = (t: any) => {
  return [
    {
      title: t("general.productName"),
      dataIndex: "name",
      key: "name",
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
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      width: 150,
    },
    {
      title: t("reports.defaultWarehouse"),
      children: [
        {
          title: t("general.quantity"),
          dataIndex: ["skladDefault", "soni"],
          key: "default_soni",
          width: 120,
        },
        {
          title: t("reports.reservation"),
          dataIndex: ["skladDefault", "bron"],
          key: "default_bron",
          width: 120,
        },
        {
          title: t("reports.kg"),
          dataIndex: ["skladDefault", "kg"],
          key: "default_kg",
          width: 120,
        },
      ],
    },
    {
      title: t("reports.mainWarehouse"),
      children: [
        {
          title: t("general.quantity"),
          dataIndex: ["skladMain", "soni"],
          key: "default_soni",
          width: 120,
        },
        {
          title: t("reports.reservation"),
          dataIndex: ["skladMain", "bron"],
          key: "default_bron",
          width: 120,
        },
        {
          title: t("reports.kg"),
          dataIndex: ["skladMain", "kg"],
          key: "default_kg",
          width: 120,
        },
      ],
    },
    {
      title: t("reports.rawMaterialWarehouse"),
      children: [
        {
          title: t("general.quantity"),
          dataIndex: ["rawMaterialWarehouse", "soni"],
          key: "default_soni",
          width: 120,
        },
        {
          title: t("reports.reservation"),
          dataIndex: ["rawMaterialWarehouse", "bron"],
          key: "default_bron",
          width: 120,
        },
        {
          title: t("reports.kg"),
          dataIndex: ["rawMaterialWarehouse", "kg"],
          key: "default_kg",
          width: 120,
        },
      ],
    },
  ];
};

const ReportsList: FC<IProps> = ({ filter }) => {
  const { t } = useTranslation();

  const { refetch } = useQuery({
    queryKey: ["sales-orders", filter],
    queryFn: async () =>
      await API.getSalesOrders({ ...filter, skip: 0, pageSize: 10 }),
  });
  const { styles } = useStyle();

  return (
    <div className="reports_list page_layout">
      <Table
        className={styles.customTable}
        columns={columns(t)}
        dataSource={data}
        bordered
        size="middle"
        scroll={{ x: "max-content" }}
        sticky={{ offsetHeader: 0 }}
        pagination={false}
      />
    </div>
  );
};

export default ReportsList;
