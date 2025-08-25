import { useState } from "react";
import SalesOrdersFilter from "./components/SalesOrdersFilter";
import SalesOrdersList from "./components/SalesOrdersList";
import type { ISalesOrdersFilter } from "./types";
import { ErrorBoundary } from "@/components";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
  cardName: undefined,
  slpCode: undefined,
  docStatus: undefined,
};

const SalesOrders = () => {
  const [filter, setFilter] = useState<ISalesOrdersFilter>(defaultDate);

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
