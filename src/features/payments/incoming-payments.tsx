import { useState } from "react";
import PurchaseInvoicesFilter from "./components/PaymentsFilter";
import PurchaseInvoicesList from "./components/PaymentsList";
import type { IPaymentsFilter } from "./types";
import { ErrorBoundary } from "@/components";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
};

const IncomingPayments = () => {
  const [filter, setFilter] = useState<IPaymentsFilter>(defaultDate);
  return (
    <div>
      <ErrorBoundary>
        <PurchaseInvoicesFilter setFilter={setFilter} paymentsType="incoming" />
      </ErrorBoundary>
      <ErrorBoundary>
        <PurchaseInvoicesList filter={filter} paymentsType="incoming" />
      </ErrorBoundary>
    </div>
  );
};

export default IncomingPayments;
