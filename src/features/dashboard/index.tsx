import { useState } from "react";
import DashboardFilter from "./components/DashboardFilter";
import Statistics from "./components/Statistics";
import "./styles.scss";
import dayjs from "dayjs";

const defaultData = {
  startDate: dayjs().format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
};

const DashboardComponent = () => {
  const [filter, setFilter] = useState(defaultData);

  return (
    <div className="dashboard">
      <DashboardFilter setFilter={setFilter} filter={filter} />
      <Statistics filter={filter} />
    </div>
  );
};

export default DashboardComponent;
