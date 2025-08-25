import { useEffect, useState, type FC } from "react";
import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { FormMode } from "@/enums";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import Paginations from "@/components/Pagination";
import "./styles.scss";
import type { IStockFilter, StockType } from "../../types";
import StockFormModalCreate from "../StockFormModalCreate";

interface IProps {
  filter: IStockFilter;
  stockType: StockType;
}

const StocksList: FC<IProps> = ({ filter, stockType }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [showStockOpen, setStockOpen] = useState(false);
  const [_, setShowOrder] = useState(null);

  const columns: TableColumnsType<any> = [
    {
      title: t("general.docNumber"),
      dataIndex: "docNum",
      key: "docNum",
    },
    {
      title: t("general.date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("stock.fromWarehouse"),
      dataIndex: "fromWarehouse",
      key: "fromWarehouse",
    },
    {
      title: t("stock.toWarehouse"),
      dataIndex: "toWarehouse",
      key: "toWarehouse",
    },
    {
      title: t("general.actions"),
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setStockOpen(true);
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
    <div className="stocks_list">
      <Table<any>
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
      <StockFormModalCreate
        open={showStockOpen}
        setOpen={setStockOpen}
        stockType={stockType}
        mode={FormMode.EDIT}
      />
    </div>
  );
};

export default StocksList;
