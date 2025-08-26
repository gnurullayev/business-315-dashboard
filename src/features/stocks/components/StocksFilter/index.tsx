import { ErrorBoundary, Filter } from "@/components";
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
  setReload?: Dispatch<SetStateAction<number>>;
  filter: IStockFilter;
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

const StocksFilter: FC<IProps> = ({
  setFilter,
  stockType,
  setReload,
  filter,
}) => {
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

  const formValues: any = {
    ...filter,
  };

  if (filter?.startDate) formValues.startDate = dayjs(filter?.startDate);
  if (filter?.endDate) formValues.endDate = dayjs(filter?.startDate);

  return (
    <div>
      <ErrorBoundary>
        <StockFormModalCreate
          open={open}
          setOpen={setOpen}
          stockType={stockType}
          mode={FormMode.CREATE}
          setReload={setReload}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Filter
          fields={fields(t)}
          onFilter={handleFilter}
          formValues={formValues}
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
      </ErrorBoundary>
    </div>
  );
};

export default StocksFilter;
