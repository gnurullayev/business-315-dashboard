import { useState } from "react";
import PurchaseInvoicesFilter from "./components/PaymentsFilter";
import PurchaseInvoicesList from "./components/PaymentsList";
import type { IPaymentsFilter } from "./types";
import { defaultPaymentFilterData } from "./incoming-payments";

const OutgoingPayments = () => {
  const [filter, setFilter] = useState<IPaymentsFilter>(
    defaultPaymentFilterData
  );
  const [reload, setReload] = useState(0);

  return (
    <div>
      <PurchaseInvoicesFilter
        setFilter={setFilter}
        paymentsType="outgoing"
        filter={filter}
        setReload={setReload}
      />

      <PurchaseInvoicesList
        filter={filter}
        paymentsType="outgoing"
        reload={reload}
      />
    </div>
  );
};

export default OutgoingPayments;
