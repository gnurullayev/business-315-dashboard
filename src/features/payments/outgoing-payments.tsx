import { useState } from "react";
import PurchaseInvoicesFilter from "./components/PaymentsFilter";
import PurchaseInvoicesList from "./components/PaymentsList";
import type { IPaymentsFilter } from "./types";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
};

const OutgoingPayments = () => {
  const [filter, setFilter] = useState<IPaymentsFilter>(defaultDate);
  return (
    <div>
      <PurchaseInvoicesFilter setFilter={setFilter} paymentsType="outgoing" />
      <PurchaseInvoicesList filter={filter} paymentsType="outgoing" />
    </div>
  );
};

export default OutgoingPayments;
