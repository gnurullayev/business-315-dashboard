import { type FC } from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {
  data: any;
}

const ActiveReconciliationModalTable: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const columns: any = [
    {
      title: t("general.date"),
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: t("general.docNumber"),
      dataIndex: "docNum",
      key: "docNum",
    },
    {
      title: t("clients.debit"),
      dataIndex: "debit",
      key: "debit",
    },
    {
      title: t("clients.credit"),
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: t("clients.currentDebt"),
      dataIndex: "cumulativeBalance",
      key: "cumulativeBalance",
    },
    {
      title: t("general.comment"),
      dataIndex: "lineMemo",
      key: "lineMemo",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export default ActiveReconciliationModalTable;
