import { useState } from "react";
import type { ISalesOrdersFilter } from "./types";
import SalesOrdersFilter from "./components/SalesOrdersFilter";
import SalesList from "./components/SalesList";
import { ErrorBoundary } from "@/components";

export const defaultSalesData = {
  startDate: undefined,
  endDate: undefined,
  cardName: undefined,
  slpCode: undefined,
  docStatus: undefined,
};

const CanceledSales = () => {
  const [filter, setFilter] = useState<ISalesOrdersFilter>(defaultSalesData);

  return (
    <>
      <ErrorBoundary>
        <SalesOrdersFilter setFilter={setFilter} salesType="canceled" />
      </ErrorBoundary>

      <ErrorBoundary>
        <SalesList filter={filter} salesType="canceled" />
      </ErrorBoundary>
    </>
  );
};

export default CanceledSales;
