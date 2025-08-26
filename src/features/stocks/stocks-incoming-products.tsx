import { useState } from "react";
import type { IStockFilter } from "./types";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";
import { ErrorBoundary } from "@/components";
import { defaultStockFilterValue } from "./stock-products";

const StocksIncomingProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultStockFilterValue);
  return (
    <div>
      <ErrorBoundary>
        <StocksFilter
          setFilter={setFilter}
          stockType="incoming-products"
          filter={filter}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <StocksList filter={filter} stockType="incoming-products" />
      </ErrorBoundary>
    </div>
  );
};

export default StocksIncomingProducts;
