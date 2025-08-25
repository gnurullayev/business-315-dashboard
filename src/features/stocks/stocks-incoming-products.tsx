import { useState } from "react";
import type { IStockFilter } from "./types";
import StocksFilter from "./components/StocksFilter";
import StocksList from "./components/StocksList";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
};

const StocksIncomingProducts = () => {
  const [filter, setFilter] = useState<IStockFilter>(defaultDate);
  return (
    <div>
      <StocksFilter setFilter={setFilter} stockType="incoming-products" />
      <StocksList filter={filter} stockType="incoming-products" />
    </div>
  );
};

export default StocksIncomingProducts;
