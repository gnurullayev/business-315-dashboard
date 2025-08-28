import { useState } from "react";
import type { IClientsFilter } from "./types";
import ClientsFilter from "./components/ClientsFilter";
import ClientsList from "./components/ClientsList";
import "./styles.scss";
import { ErrorBoundary } from "@/components";

const defaultData = {
  groupCode: undefined,
  cardName: undefined,
};

const ClientsInfo = () => {
  const [filter, setFilter] = useState<IClientsFilter>(defaultData);
  return (
    <div className="page_layout">
      <div className="clients_info">
        <ErrorBoundary>
          <ClientsFilter setFilter={setFilter} setReload={() => null} />
        </ErrorBoundary>

        <ErrorBoundary>
          <ClientsList filter={filter} clientPageType="client-info" />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ClientsInfo;
