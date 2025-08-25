import { Filter } from "@/components";
import type { FilterField } from "@/components/Filter/type";
import dayjs from "dayjs";
import type { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  setFilter: Dispatch<SetStateAction<any>>;
}

const DashboardFilter: FC<IProps> = ({ setFilter }) => {
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

  return (
    <div>
      <Filter
        fields={fields}
        onFilter={handleFilter}
        // extraButton={
        //   <Button type="primary" danger>
        //     Buyurtma qo‘shish
        //   </Button>
        // }
      />
    </div>
  );
};

export default DashboardFilter;
