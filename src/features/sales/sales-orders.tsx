import { useState } from "react";
import SalesOrdersFilter from "./components/SalesOrdersFilter";
import SalesOrdersList from "./components/SalesOrdersList";
import type { ISalesOrdersFilter } from "./types";
import { ErrorBoundary } from "@/components";
import { defaultSalesData } from "./canceled-sales";

const SalesOrders = () => {
  const [filter, setFilter] = useState<ISalesOrdersFilter>(defaultSalesData);

  return (
    <>
      <ErrorBoundary>
        <SalesOrdersFilter setFilter={setFilter} salesType="order" />
      </ErrorBoundary>

      <ErrorBoundary>
        <SalesOrdersList filter={filter} salesType="order" />
      </ErrorBoundary>
    </>
  );
};

export default SalesOrders;
