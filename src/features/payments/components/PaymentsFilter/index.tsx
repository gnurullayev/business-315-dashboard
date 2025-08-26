import { ErrorBoundary, Filter } from "@/components";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IPaymentsFilter, PaymentsType } from "../../types";
import AddPaymentsModalForm from "../AddPaymentsModalForm";

interface IProps {
  setFilter: Dispatch<SetStateAction<IPaymentsFilter>>;
  paymentsType: PaymentsType;
  filter: IPaymentsFilter;
  setReload: Dispatch<SetStateAction<number>>;
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

const PaymentsFilter: FC<IProps> = ({
  setFilter,
  paymentsType,
  filter,
  setReload,
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
        <AddPaymentsModalForm
          open={open}
          setOpen={setOpen}
          setReload={(prev) => setReload(prev)}
          paymentsType={paymentsType}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Filter
          fields={fields(t)}
          onFilter={handleFilter}
          formValues={formValues}
          extraButton={
            <Button type="primary" onClick={() => setOpen(true)}>
              {t(
                `payments.${
                  paymentsType === "incoming" ? "addInputFees" : "addOutputFees"
                }`
              )}
            </Button>
          }
        />
      </ErrorBoundary>
    </div>
  );
};

export default PaymentsFilter;
