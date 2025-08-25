import { useState } from "react";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";
import type { IStockFilter } from "./types";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
};

const StocksDeliveredProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultDate);
  return (
    <div>
      <StocksFilter setFilter={setFilter} stockType="delivered-products" />
      <StocksList filter={filter} stockType="delivered-products" />
    </div>
  );
};

export default StocksDeliveredProducts;
