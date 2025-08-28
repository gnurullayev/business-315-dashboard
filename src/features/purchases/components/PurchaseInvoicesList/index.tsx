import { useMemo, useState, type FC } from "react";
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
import type { IPurchase } from "@/types/purchase";
import { ErrorBoundary } from "@/components";

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
  const [showPurchaseOpen, setShowPurchaseOpen] = useState(false);
  const [showPurchase, setShowPurchase] = useState<IPurchase | null>(null);

  const columns: TableColumnsType<DataType> = [
    {
      title: t("general.docNumber"),
      dataIndex: "docNum",
      key: "docNum",
      width: 150,
    },
    {
      title: t("purchases.supplier"),
      dataIndex: "cardName",
      key: "cardName",
      width: 250,
    },
    {
      title: t("general.quantity"),
      dataIndex: "docDate",
      key: "docDate",
      width: 120,
    },
    {
      title: t("general.totalAmount"),
      key: "docTotal",
      width: 150,
      render: (_: any, record: any) => (
        <span>
          {record?.docTotal} {record?.docCurrency}
        </span>
      ),
    },
    {
      title: t("general.actions"),
      key: "action",
      width: 100,
      render: (_: any, record: any) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowPurchaseOpen(true);
              setShowPurchase(record);
            }}
          >
            <Eye />
          </Button>
        </>
      ),
    },
  ];

  const stableFilter = useMemo(() => filter, [JSON.stringify(filter)]);

  const fetchPurchases = async () => {
    const param = {
      ...stableFilter,
      skip: page,
      pageSize: 10,
    };
    if (purchasesType === "purchaseInvoices") {
      return API.getPurchaseInvoices(param);
    }
    return API.getReservePurchaseInvoices(param);
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["purchases", purchasesType, stableFilter, page],
    queryFn: fetchPurchases,
  });

  const onChange = (value: any) => {
    setPage((value -= 1));
  };

  return (
    <div className="purchase_invoices_list">
      <ErrorBoundary>
        <Table<DataType>
          columns={columns}
          dataSource={data?.data ? data?.data : []}
          loading={isLoading}
          pagination={false}
          scroll={{ x: "max-content" }}
          sticky={{ offsetHeader: 0 }}
        />
      </ErrorBoundary>

      <Paginations
        onChange={onChange}
        isLoading={isLoading}
        isDataLength={data?.data?.length < 10}
      />

      <ErrorBoundary>
        <PurchaseShowModal
          purchasesType={purchasesType}
          open={showPurchaseOpen}
          setOpen={setShowPurchaseOpen}
          showPurchase={showPurchase}
          setShowPurchase={setShowPurchase}
          purchaseRefetch={refetch}
        />
      </ErrorBoundary>
    </div>
  );
};

export default PurchaseInvoicesList;
