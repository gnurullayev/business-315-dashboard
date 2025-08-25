import { useState } from "react";
import DashboardFilter from "./components/DashboardFilter";
import Statistics from "./components/Statistics";
import "./styles.scss";
import dayjs from "dayjs";

const defaultDate = {
  startDate: dayjs().format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
};

const DashboardComponent = () => {
  const [filter, setFilter] = useState(defaultDate);

  return (
    <div className="dashboard">
      <DashboardFilter setFilter={setFilter} />
      <Statistics filter={filter} />
    </div>
  );
};

export default DashboardComponent;
