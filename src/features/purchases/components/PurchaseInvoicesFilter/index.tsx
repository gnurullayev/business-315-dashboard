import { ErrorBoundary, Filter } from "@/components";
import { API } from "@/services/api";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IPurchaseFilter, PurchasesFormType } from "../../types";
import PurchaseCreateCreate from "../PurchaseCreate";
import { defaultPurchaseInvoicesFilterData } from "../../purchase-invoices";

interface IProps {
  setFilter: Dispatch<SetStateAction<IPurchaseFilter>>;
  filter: IPurchaseFilter;
  purchasesType: PurchasesFormType;
}

const fields: any = (t: any) => {
  return [
    {
      type: "select",
      name: "cardName",
      label: t("purchases.searchBySupplier"),
      placeholder: t("general.choose"),
      params: { cardType: "S" },
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

const PurchaseInvoicesFilter: FC<IProps> = ({
  setFilter,
  purchasesType,
  filter,
}) => {
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
        <PurchaseCreateCreate
          open={open}
          setOpen={setOpen}
          purchaseRefetch={() => setFilter(defaultPurchaseInvoicesFilterData)}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Filter
          fields={fields(t)}
          onFilter={handleFilter}
          formValues={formValues}
          extraButton={
            <>
              {purchasesType === "purchaseInvoices" && (
                <Button type="primary" onClick={() => setOpen(true)}>
                  {t(`purchases.addPurchase`)}
                </Button>
              )}
            </>
          }
        />
      </ErrorBoundary>
    </div>
  );
};

export default PurchaseInvoicesFilter;
