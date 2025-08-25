import { useEffect, useState, type FC } from "react";
import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import Paginations from "@/components/Pagination";
import "./styles.scss";
import type { IPurchaseFilter, PurchasesFormType } from "../../types";
import PurchaseShowModal from "../PurchaseShowModal";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface IProps {
  filter: IPurchaseFilter;
  purchasesType: PurchasesFormType;
}

const PurchaseInvoicesList: FC<IProps> = ({ filter, purchasesType }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [showOrderOpen, setShowOrderOpen] = useState(false);
  const [showOrder, setShowOrder] = useState(null);

  const columns: TableColumnsType<DataType> = [
    {
      title: t("general.docNumber"),
      dataIndex: "docNum",
      key: "docNum",
    },
    {
      title: t("purchases.supplier"),
      dataIndex: "cardName",
      key: "cardName",
    },
    {
      title: t("general.quantity"),
      dataIndex: "docDate",
      key: "docDate",
    },
    {
      title: t("general.totalAmount"),
      key: "docTotal",
      render: (_: any, record: any) => (
        <span>
          {record?.docTotal} {record?.docCurrency}
        </span>
      ),
    },
    {
      title: t("general.actions"),
      key: "action",
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
    <div className="purchase_invoices_list">
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
      <PurchaseShowModal
        purchasesType={purchasesType}
        open={showOrderOpen}
        setOpen={setShowOrderOpen}
        showPurchase={showOrder}
        setShowPurchase={setShowOrder}
        purchaseRefetch={refetch}
      />
    </div>
  );
};

export default PurchaseInvoicesList;
