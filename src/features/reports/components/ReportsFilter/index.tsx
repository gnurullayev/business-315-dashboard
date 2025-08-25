import { Filter } from "@/components";
import { API } from "@/services/api";
import dayjs from "dayjs";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IReportsFilter } from "../../types";

interface IProps {
  setFilter: Dispatch<SetStateAction<IReportsFilter>>;
}

const fields: any = (t: any) => {
  return [
    {
      type: "select",
      name: "cardName",
      label: t("reports.searchByClientName"),
      placeholder: t("general.choose"),
      params: { cardType: "C" },
      request: API.getBusinessPartners,
      paramKey: "cardName",
      resDataKey: "data",
      valueKey: "cardName",
      labelKey: "cardName",
      showSearch: true,
    },
    {
      type: "date",
      name: "startDate",
      label: t("general.startDate"),
      placeholder: t("general.choose"),
    },
    {
      type: "date",
      name: "endDate",
      label: t("general.endDate"),
      placeholder: t("general.choose"),
    },
  ];
};

const ReportsFilter: FC<IProps> = ({ setFilter }) => {
  const { t } = useTranslation();

  const handleFilter = (values: Record<string, any>) => {
    if (values)
      setFilter({
        cardName: values.carName,
        startDate: values?.startDate
          ? dayjs(values?.startDate).format("YYYY-MM-DD")
          : undefined,
        endDate: values?.endDate
          ? dayjs(values?.endDate).format("YYYY-MM-DD")
          : undefined,
      });
  };

  return <Filter fields={fields(t)} onFilter={handleFilter} />;
};

export default ReportsFilter;
