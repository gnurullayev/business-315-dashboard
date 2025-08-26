import { useState } from "react";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";
import type { IStockFilter } from "./types";
import { ErrorBoundary } from "@/components";
import { defaultStockFilterValue } from "./stock-products";

const StocksDeliveredProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultStockFilterValue);
  const [reload, setReload] = useState(0);
  return (
    <div>
      <ErrorBoundary>
        <StocksFilter
          setFilter={setFilter}
          stockType="delivered-products"
          filter={filter}
          setReload={setReload}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <StocksList
          filter={filter}
          stockType="delivered-products"
          reload={reload}
        />
      </ErrorBoundary>
    </div>
  );
};

export default StocksDeliveredProducts;
