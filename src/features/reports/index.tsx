import { useState } from "react";
import type { IReportsFilter } from "./types";
import ReportsFilter from "./components/ReportsFilter";
import ReportsList from "./components/ReportsList";
import { ErrorBoundary } from "@/components";
import "./styles.scss";

const defaultDate = {
  startDate: undefined,
  endDate: undefined,
  cardName: undefined,
};

const ReportsInfo = () => {
  const [filter, setFilter] = useState<IReportsFilter>(defaultDate);
  return (
    <div className="page_layout">
      <div className="reports_info">
        <ErrorBoundary>
          <ReportsFilter setFilter={setFilter} />
        </ErrorBoundary>

        <ErrorBoundary>
          <ReportsList filter={filter} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ReportsInfo;
