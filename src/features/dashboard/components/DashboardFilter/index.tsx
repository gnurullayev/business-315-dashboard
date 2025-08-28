import { Filter } from "@/components";
import type { FilterField } from "@/components/Filter/type";
import dayjs from "dayjs";
import type { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IDashboardFilter } from "../../types";

interface IProps {
  setFilter: Dispatch<SetStateAction<any>>;
  filter: IDashboardFilter;
}

const DashboardFilter: FC<IProps> = ({ setFilter, filter }) => {
  const { t } = useTranslation();
  const fields: FilterField[] = [
    {
      type: "date",
      name: "startDate",
      label: t("general.startDate"),
    },
    {
      type: "date",
      name: "endDate",
      label: t("general.endDate"),
    },
  ];

  const handleFilter = (values: Record<string, any>) => {
    if (values)
      setFilter({
        startDate: values?.startDate
          ? dayjs(values?.startDate).format("YYYY-MM-DD")
          : undefined,
        endDate: values?.endDate
          ? dayjs(values?.endDate).format("YYYY-MM-DD")
          : undefined,
      });
  };

  const formValues: any = {
    ...filter,
  };

  if (filter?.startDate) formValues.startDate = dayjs(filter?.startDate);
  if (filter?.endDate) formValues.endDate = dayjs(filter?.startDate);

  return (
    <div>
      <Filter fields={fields} onFilter={handleFilter} formValues={formValues} />
    </div>
  );
};

export default DashboardFilter;
