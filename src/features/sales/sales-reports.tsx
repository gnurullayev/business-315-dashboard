import { useState } from "react";
import "./styles.scss";
import { ErrorBoundary } from "@/components";
import ClientsFilter from "../clients/components/ClientsFilter";
import ClientsList from "../clients/components/ClientsList";
import type { IClientsFilter } from "../clients/types";

const defaultDate = {
  group: undefined,
  cardName: undefined,
};

const SalesReports = () => {
  const [filter, setFilter] = useState<IClientsFilter>(defaultDate);
  return (
    <div className="page_layout">
      <div className="clients_info">
        <ErrorBoundary>
          <ClientsFilter
            setFilter={setFilter}
            setReload={() => null}
            clientPageType="sales-reports"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <ClientsList filter={filter} clientPageType="sales-reports" />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default SalesReports;
