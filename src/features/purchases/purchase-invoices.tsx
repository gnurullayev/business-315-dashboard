import { useState } from "react";
import PurchaseInvoicesFilter from "./components/PurchaseInvoicesFilter";
import PurchaseInvoicesList from "./components/PurchaseInvoicesList";
import type { IPurchaseFilter } from "./types";
import dayjs from "dayjs";
import { ErrorBoundary } from "@/components";

export const defaultPurchaseInvoicesFilterData = {
  startDate: undefined,
  endDate: dayjs().format("YYYY-MM-DD"),
  cardName: undefined,
};

const PurchaseInvoices = () => {
  const [filter, setFilter] = useState<IPurchaseFilter>(
    defaultPurchaseInvoicesFilterData
  );
  return (
    <div>
      <ErrorBoundary>
        <PurchaseInvoicesFilter
          setFilter={setFilter}
          purchasesType="purchaseInvoices"
          filter={filter}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <PurchaseInvoicesList
          filter={filter}
          purchasesType="purchaseInvoices"
        />
      </ErrorBoundary>
    </div>
  );
};

export default PurchaseInvoices;
