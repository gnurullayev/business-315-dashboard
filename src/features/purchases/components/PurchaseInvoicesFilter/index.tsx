import { Filter } from "@/components";
import { API } from "@/services/api";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IPurchaseFilter, PurchasesFormType } from "../../types";
import PaymentModalForm from "../PaymentModalForm";

interface IProps {
  setFilter: Dispatch<SetStateAction<IPurchaseFilter>>;
  purchasesType: PurchasesFormType;
}

const fields: any = (t: any) => {
  return [
    {
      type: "select",
      name: "cardName",
      label: t("purchases.searchBySupplier"),
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

const PurchaseInvoicesFilter: FC<IProps> = ({ setFilter, purchasesType }) => {
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

  return (
    <div>
      <PaymentModalForm open={open} setOpen={setOpen} setReload={() => null} />
      <Filter
        fields={fields(t)}
        onFilter={handleFilter}
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
    </div>
  );
};

export default PurchaseInvoicesFilter;
