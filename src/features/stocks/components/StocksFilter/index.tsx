import { Filter } from "@/components";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IStockFilter, StockType } from "../../types";
import StockFormModalCreate from "../StockFormModalCreate";
import { FormMode } from "@/enums";

interface IProps {
  setFilter: Dispatch<SetStateAction<IStockFilter>>;
  stockType: StockType;
}

const fields: any = (t: any) => {
  return [
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

const StocksFilter: FC<IProps> = ({ setFilter, stockType }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

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
      <StockFormModalCreate
        open={open}
        setOpen={setOpen}
        stockType={stockType}
        mode={FormMode.CREATE}
      />
      <Filter
        fields={fields(t)}
        onFilter={handleFilter}
        extraButton={
          <>
            {stockType === "stock-products" && (
              <Button type="primary" onClick={() => setOpen(true)}>
                {t(`general.add`)}
              </Button>
            )}
          </>
        }
      />
    </div>
  );
};

export default StocksFilter;
