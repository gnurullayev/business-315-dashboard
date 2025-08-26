import { useState, type FC } from "react";
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
import type { IStock } from "@/types/stock";
import dayjs from "dayjs";
import { ErrorBoundary } from "@/components";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface IProps {
  filter: IStockFilter;
  stockType: StockType;
  reload?: number;
}

const StocksList: FC<IProps> = ({ filter, stockType, reload }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [showStockOpen, setStockOpen] = useState(false);
  const [showStock, setShowStock] = useState(null);
  const userInfo = useSelector((store: RootState) => store.userData);

  const columns: TableColumnsType<IStock> = [
    {
      title: t("general.docNumber"),
      dataIndex: "docNum",
      key: "docNum",
    },
    {
      title: t("general.date"),
      dataIndex: "docDate",
      key: "docDate",
      render: (_v: any, record) => (
        <span>{dayjs(record.docDate).format("DD.MM.YYYY")}</span>
      ),
    },
    {
      title: t("stock.fromWarehouse"),
      dataIndex: "fromWarehouseName",
      key: "fromWarehouseName",
    },
    {
      title: t("stock.toWarehouse"),
      dataIndex: "toWarehouseName",
      key: "toWarehouseName",
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
              setShowStock(record);
            }}
          >
            <Eye />
          </Button>
        </>
      ),
    },
  ];

  const stockWarehouseParams = () => {
    const param: any = {};
    if (stockType === "stock-products" || stockType === "receiving-products") {
      param.fromWarehouseCode = userInfo.wareHouse;
    } else {
      param.toWarehouseCode = userInfo.wareHouse;
    }
    return param;
  };

  const fetchPurchases = async () => {
    const param = {
      ...filter,
      ...stockWarehouseParams(),
      skip: page,
      documentStatus: "O",
      pageSize: 10,
    };
    if (stockType === "stock-products" || stockType === "incoming-products") {
      return await API.getInventoryTransferRequests(param);
    }
    return await API.getStockTransfers(param);
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getInventoryTransferRequests", filter, page, reload],
    queryFn: fetchPurchases,
  });

  const onChange = (value: any) => {
    setPage((value -= 1));
  };

  const setReload = (_: number) => {
    refetch();
  };

  return (
    <div className="stocks_list">
      <ErrorBoundary>
        <Table<IStock>
          columns={columns}
          dataSource={data?.data ? data?.data : []}
          loading={isLoading}
          pagination={false}
          rowKey={(record) => record.docEntry}
        />
      </ErrorBoundary>

      <Paginations
        onChange={onChange}
        isLoading={isLoading}
        isDataLength={data?.data?.length < 10}
      />

      <ErrorBoundary>
        <StockFormModalCreate
          open={showStockOpen}
          setOpen={setStockOpen}
          stockType={stockType}
          mode={FormMode.EDIT}
          setReload={setReload}
          showStock={showStock}
        />
      </ErrorBoundary>
    </div>
  );
};

export default StocksList;
