import { useState, type FC } from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { useTranslation } from "react-i18next";
import Paginations from "@/components/Pagination";
import "./styles.scss";
import type { IPaymentsFilter, PaymentsType } from "../../types";
import { ErrorBoundary } from "@/components";
import type { IPayment } from "@/types/payment";
import { formatDate } from "@/utils/formatDate";

interface IProps {
  paymentsType: PaymentsType;
  filter: IPaymentsFilter;
  reload: number;
}

const PaymentsList: FC<IProps> = ({ filter, paymentsType, reload }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const columns: TableColumnsType<IPayment> = [
    {
      title: t("sales.documentNumber"),
      dataIndex: "docNum",
      key: "docNum",
      width: 150,
    },
    ...(paymentsType === "incoming"
      ? [
          {
            title: t("general.client"),
            dataIndex: "cardName",
            key: "cardName",
            width: 250,
          },
        ]
      : []),
    ...(paymentsType === "outgoing"
      ? [
          {
            title: t("payments.outgoingCash"),
            key: "outgoingCash",
            render: (_value: string, record: IPayment) => {
              return (
                <span>
                  {record.cardCode}
                  {record.cardName && " - " + record.cardName}
                </span>
              );
            },
            width: 200,
          },
        ]
      : []),

    {
      title: t("payments.incomingCash"),
      key: "cashAcct",
      render: (_, record) => {
        return (
          <span>
            {record.cashAcct} - {record.cashAcctName}
          </span>
        );
      },
      width: 200,
    },
    {
      title: t("general.date"),
      key: "docDate",
      render: (_, record) => (
        <span>
          {formatDate(record.docDate, "DD.MM.YYYY", "DD.MM.YYYY") as string}
        </span>
      ),
      width: 150,
    },

    {
      title: t("general.totalAmount"),
      key: "totalAmount",
      render: (_, record) => {
        return (
          <span>
            {record.cashSum} {record.docCurr}
          </span>
        );
      },
      width: 200,
    },
    {
      title: t("general.comment"),
      dataIndex: "comments",
      key: "comments",
      width: 250,
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: [paymentsType, filter, page, reload],
    queryFn: async () =>
      await API[
        paymentsType === "incoming"
          ? "getIncomingPaymentInvoices"
          : "getVendorPaymentAccounts"
      ]({ ...filter, skip: page, pageSize: 10 }),
  });

  const onChange = (value: any) => {
    setPage((value -= 1));
  };

  return (
    <div className="payments_list">
      <ErrorBoundary>
        <Table<IPayment>
          columns={columns}
          dataSource={data?.data ? data?.data : []}
          loading={isLoading}
          pagination={false}
          scroll={{ x: "max-content" }}
          sticky={{ offsetHeader: 0 }}
          rowKey={(record) => record.docEntry}
        />
      </ErrorBoundary>

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
