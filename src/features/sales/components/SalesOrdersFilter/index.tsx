import { ErrorBoundary, Filter } from "@/components";
import { API } from "@/services/api";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { ISalesOrdersFilter, SalesFormType } from "../../types";
import SalesOrderCreate from "../SalesOrderCreate";

interface IProps {
  setFilter: Dispatch<SetStateAction<ISalesOrdersFilter>>;
  salesType: SalesFormType;
}

const fields: any = (t: any) => {
  return [
    {
      type: "select",
      name: "cardName",
      label: t("sales.searchByCustomerName"),
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
    {
      type: "select",
      name: "slpCode",
      label: t("sales.salesManager"),
      placeholder: t("general.choose"),
      request: API.getSalesEmployees,
      resDataKey: "data",
      valueKey: "slpCode",
      labelKey: "slpName",
    },
  ];
};

const SalesOrdersFilter: FC<IProps> = ({ setFilter, salesType }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleFilter = (values: Record<string, any>) => {
    if (values)
      setFilter({
        cardName: values?.cardName,
        startDate: values?.startDate
          ? dayjs(values?.startDate).format("YYYY-MM-DD")
          : undefined,
        endDate: values?.endDate
          ? dayjs(values?.endDate).format("YYYY-MM-DD")
          : undefined,
        slpCode: values?.slpCode,
      });
  };

  const refetch = () => {
    setFilter({} as ISalesOrdersFilter);
  };

  return (
    <div>
      <ErrorBoundary>
        <SalesOrderCreate
          open={open}
          setOpen={setOpen}
          salesType={salesType}
          ordersRefetch={refetch}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Filter
          fields={fields(t)}
          onFilter={handleFilter}
          extraButton={
            <>
              {(salesType === "order" || salesType === "sales") && (
                <Button type="primary" onClick={() => setOpen(true)}>
                  {t(
                    `sales.${salesType === "sales" ? "addSales" : "addOrder"}`
                  )}
                </Button>
              )}
            </>
          }
        />
      </ErrorBoundary>
    </div>
  );
};

export default SalesOrdersFilter;
