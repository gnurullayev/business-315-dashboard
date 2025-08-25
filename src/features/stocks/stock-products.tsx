import { useState } from "react";
import type { IStockFilter } from "./types";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
};

const StockProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultDate);
  return (
    <div>
      <StocksFilter setFilter={setFilter} stockType="stock-products" />
      <StocksList filter={filter} stockType="stock-products" />
    </div>
  );
};

export default StockProducts;
