import { useState } from "react";
import type { ISalesOrdersFilter } from "./types";
import SalesOrdersFilter from "./components/SalesOrdersFilter";
import SalesList from "./components/SalesList";
import { ErrorBoundary } from "@/components";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
  cardName: undefined,
  slpCode: undefined,
  docStatus: undefined,
};

const Sales = () => {
  const [filter, setFilter] = useState<ISalesOrdersFilter>(defaultDate);

  return (
    <>
      <ErrorBoundary>
        <SalesOrdersFilter setFilter={setFilter} salesType="sales" />
      </ErrorBoundary>

      <ErrorBoundary>
        <SalesList filter={filter} salesType="sales" />
      </ErrorBoundary>
    </>
  );
};

export default Sales;
