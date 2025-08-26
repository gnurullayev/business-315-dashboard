import { useState } from "react";
import PaymentsFilter from "./components/PaymentsFilter";
import PaymentsList from "./components/PaymentsList";
import type { IPaymentsFilter } from "./types";
import { ErrorBoundary } from "@/components";
import dayjs from "dayjs";
export const defaultPaymentFilterData = {
  startDate: undefined,
  endDate: dayjs().format("YYYY-MM-DD"),
};

const IncomingPayments = () => {
  const [filter, setFilter] = useState<IPaymentsFilter>(
    defaultPaymentFilterData
  );
  const [reload, setReload] = useState(0);

  return (
    <div>
      <ErrorBoundary>
        <PaymentsFilter
          setFilter={setFilter}
          paymentsType="incoming"
          filter={filter}
          setReload={setReload}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <PaymentsList filter={filter} paymentsType="incoming" reload={reload} />
      </ErrorBoundary>
    </div>
  );
};

export default IncomingPayments;
