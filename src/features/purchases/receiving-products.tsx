import { useState } from "react";
import PurchaseInvoicesFilter from "./components/PurchaseInvoicesFilter";
import PurchaseInvoicesList from "./components/PurchaseInvoicesList";
import type { IPurchaseFilter } from "./types";
import dayjs from "dayjs";
import { ErrorBoundary } from "@/components";

const defaultData = {
  startDate: undefined,
  endDate: dayjs().format("YYYY-MM-DD"),
  cardName: undefined,
};

const ReceivingProducts = () => {
  const [filter, setFilter] = useState<IPurchaseFilter>(defaultData);
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
          purchasesType="purchasesReceiving"
        />
      </ErrorBoundary>
    </div>
  );
};

export default ReceivingProducts;
