import { useState } from "react";
import PurchaseInvoicesFilter from "./components/PurchaseInvoicesFilter";
import PurchaseInvoicesList from "./components/PurchaseInvoicesList";
import type { IPurchaseFilter } from "./types";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
  cardName: undefined,
};

const PurchaseInvoices = () => {
  const [filter, setFilter] = useState<IPurchaseFilter>(defaultDate);
  return (
    <div>
      <PurchaseInvoicesFilter
        setFilter={setFilter}
        purchasesType="purchaseInvoices"
      />
      <PurchaseInvoicesList filter={filter} purchasesType="purchaseInvoices" />
    </div>
  );
};

export default PurchaseInvoices;
