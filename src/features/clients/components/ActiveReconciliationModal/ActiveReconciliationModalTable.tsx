import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const ActiveReconciliationModalTable: React.FC = () => {
  const { t } = useTranslation();
  const columns: any = [
    {
      title: t("general.date"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("general.docNumber"),
      dataIndex: "age",
      key: "age",
    },
    {
      title: t("client.debit"),
      dataIndex: "address1",
      key: "address1",
    },
    {
      title: t("client.credit"),
      dataIndex: "address2",
      key: "address2",
    },
    {
      title: t("client.currentDebt"),
      dataIndex: "address3",
      key: "address3",
    },
    {
      title: t("general.comment"),
      dataIndex: "address4",
      key: "address4",
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default ActiveReconciliationModalTable;
