import { useState } from "react";
import type { IStockFilter } from "./types";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";
import { ErrorBoundary } from "@/components";
import dayjs from "dayjs";

export const defaultStockFilterValue = {
  startDate: undefined,
  endDate: dayjs().format("YYYY-MM-DD"),
};

const StockProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultStockFilterValue);
  const [reload, setReload] = useState(0);

  return (
    <div>
      <ErrorBoundary>
        <StocksFilter
          setFilter={setFilter}
          stockType="stock-products"
          setReload={setReload}
          filter={filter}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <StocksList
          filter={filter}
          stockType="stock-products"
          reload={reload}
        />
      </ErrorBoundary>
    </div>
  );
};

export default StockProducts;
