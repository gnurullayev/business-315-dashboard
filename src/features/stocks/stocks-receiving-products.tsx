import { useState } from "react";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";
import type { IStockFilter } from "./types";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
};

const StocksReceivingProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultDate);
  return (
    <div>
      <StocksFilter setFilter={setFilter} stockType="receiving-products" />
      <StocksList filter={filter} stockType="receiving-products" />
    </div>
  );
};

export default StocksReceivingProducts;
