import { useState } from "react";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";
import type { IStockFilter } from "./types";
import { ErrorBoundary } from "@/components";
import { defaultStockFilterValue } from "./stock-products";

const StocksReceivingProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultStockFilterValue);
  return (
    <div>
      <ErrorBoundary>
        <StocksFilter
          setFilter={setFilter}
          stockType="receiving-products"
          filter={filter}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <StocksList filter={filter} stockType="receiving-products" />
      </ErrorBoundary>
    </div>
  );
};

export default StocksReceivingProducts;
