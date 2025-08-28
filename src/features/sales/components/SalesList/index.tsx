import { useState, type FC } from "react";
import type { TableColumnsType } from "antd";
import { Button, Table, Tag } from "antd";
import type { ISalesOrdersFilter, SalesFormType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import Paginations from "@/components/Pagination";
import "./styles.scss";
import SalesOrderEditOrShow from "../SalesOrderEditOrShow";
import { DocStatus } from "@/enums";
import { ErrorBoundary } from "@/components";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface IProps {
  filter: ISalesOrdersFilter;
  salesType: SalesFormType;
}

const renameDocStatus = (t: any, key: string) => {
  switch (key) {
    case DocStatus.CLOSE:
      return <Tag color="red">{t("docStatus.C")}</Tag>;
    case DocStatus.OPEN:
      return <Tag color="green">{t("docStatus.O")}</Tag>;
    default:
      return <Tag color="blue">{t("docStatus.A")}</Tag>;
  }
};

const SalesList: FC<IProps> = ({ filter, salesType }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [showOrderOpen, setShowOrderOpen] = useState(false);
  const [showOrder, setShowOrder] = useState(null);

  const columns: TableColumnsType<DataType> = [
    {
      title: t("sales.documentNumber"),
      dataIndex: "docNum",
      key: "docNum",
      width: 150,
    },
    {
      title: t("sales.customerName"),
      dataIndex: "cardName",
      key: "cardName",
      width: 250,
    },
    {
      title: t("sales.date"),
      dataIndex: "docDate",
      key: "docDate",
      width: 100,
    },
    {
      title: t("sales.totalAmountOfDocument"),
      key: "docTotal",
      width: 200,
      render: (_: any, record: any) => (
        <span>
          {record?.docTotal} {record?.docCurrency}
        </span>
      ),
    },
    ...(salesType === "sales"
      ? [
          {
            title: t("sales.paidUntilToday"),
            dataIndex: "paidToDate",
            key: "paidToDate",
            width: 200,
          },
          {
            title: t("sales.totalPaidAmount"),
            dataIndex: "paidSum",
            key: "paidSum",
            width: 200,
          },
          {
            title: t("sales.documentStatus"),
            key: "docStatus",
            width: 200,
            render: (_: any, record: any) => (
              <span>{renameDocStatus(t, record?.docStatus)}</span>
            ),
          },
        ]
      : []),
    {
      title: t("sales.salesManager"),
      dataIndex: "slpName",
      key: "slpName",
      width: 300,
    },
    {
      title: t("general.actions"),
      key: "action",
      width: 200,
      render: (_: any, record: any) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowOrderOpen(true);
              setShowOrder(record);
            }}
          >
            <Eye />
          </Button>
        </>
      ),
    },
  ];

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["sales-list", filter, page],
    queryFn: async () =>
      await API[salesType === "sales" ? "getSalesList" : "getSalesCreditNotes"](
        { ...filter, skip: page, pageSize: 10 }
      ),
  });

  const onChange = (value: any) => {
    setPage((value -= 1));
  };

  return (
    <div className="sales-list">
      <Table<DataType>
        columns={columns}
        dataSource={data?.data ? data?.data : []}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        sticky={{ offsetHeader: 0 }}
      />
      <Paginations
        onChange={onChange}
        isLoading={isLoading}
        isDataLength={data?.data?.length < 10}
      />
      <ErrorBoundary>
        <SalesOrderEditOrShow
          open={showOrderOpen}
          setOpen={setShowOrderOpen}
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          ordersRefetch={refetch}
          salesType={salesType}
        />
      </ErrorBoundary>
    </div>
  );
};

export default SalesList;
