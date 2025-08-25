import { useEffect, useState, type FC } from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import Paginations from "@/components/Pagination";
import "./styles.scss";
import type { IPaymentsFilter, PaymentsType } from "../../types";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface IProps {
  paymentsType: PaymentsType;
  filter: IPaymentsFilter;
}

const PaymentsList: FC<IProps> = ({ filter, paymentsType }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const columns: TableColumnsType<DataType> = [
    {
      title: t("sales.documentNumber"),
      dataIndex: "docNum",
      key: "docNum",
    },
    ...(paymentsType === "incoming"
      ? [
          {
            title: t("general.client"),
            dataIndex: "client",
            key: "client",
          },
        ]
      : []),
    ...(paymentsType === "outgoing"
      ? [
          {
            title: t("payments.outgoingCash"),
            dataIndex: "outgoingCash",
            key: "outgoingCash",
          },
        ]
      : []),

    {
      title: t("payments.incomingCash"),
      dataIndex: "incomingCash",
      key: "incomingCash",
    },
    {
      title: t("general.date"),
      dataIndex: "date",
      key: "date",
    },

    {
      title: t("general.totalAmount"),
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: t("general.comment"),
      dataIndex: "comment",
      key: "comment",
    },
  ];

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["sales-orders", filter, page],
    queryFn: async () =>
      await API.getSalesOrders({ ...filter, skip: page, pageSize: 10 }),
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  const onChange = (value: any) => {
    setPage((value -= 1));
    refetch();
  };

  return (
    <div className="payments_list">
      <Table<DataType>
        columns={columns}
        dataSource={data?.data ? data?.data : []}
        loading={isLoading}
        pagination={false}
      />
      <Paginations
        onChange={onChange}
        isLoading={isLoading}
        isDataLength={data?.data?.length < 10}
      />
      {/* <SalesOrderEditOrShow
        open={showOrderOpen}
        setOpen={setShowOrderOpen}
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        ordersRefetch={refetch}
        salesType="order"
      /> */}
    </div>
  );
};

export default PaymentsList;
