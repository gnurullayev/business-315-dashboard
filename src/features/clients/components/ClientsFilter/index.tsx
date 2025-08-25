import { ErrorBoundary, Filter } from "@/components";
import { API } from "@/services/api";
import { Button } from "antd";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { ClientPageType, IClientsFilter } from "../../types";
import ClientModalForm from "../ClientModalForm";

interface IProps {
  setFilter: Dispatch<SetStateAction<IClientsFilter>>;
  setReload: () => void;
  clientPageType?: ClientPageType;
}

const fields: any = (t: any) => {
  return [
    {
      type: "select",
      name: "cardName",
      label: t("clients.searchByClientName"),
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
      type: "select",
      name: "group",
      label: t("clients.customerGroup"),
      placeholder: t("general.choose"),
      params: { cardType: "C" },
      request: API.getBusinessPartners,
      paramKey: "cardName",
      resDataKey: "data",
      valueKey: "cardName",
      labelKey: "cardName",
      showSearch: true,
    },
  ];
};

const ClientsFilter: FC<IProps> = ({
  setFilter,
  setReload,
  clientPageType = "client-info",
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleFilter = (values: Record<string, any>) => {
    if (values)
      setFilter({
        cardName: values?.cardName,
        group: values?.cardName,
      });
  };

  return (
    <>
      <ErrorBoundary>
        <ClientModalForm
          open={open}
          setOpen={setOpen}
          setReload={setReload}
          clientPageType={clientPageType}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Filter
          fields={fields(t)}
          onFilter={handleFilter}
          extraButton={
            <>
              {clientPageType === "client-info" && (
                <Button type="primary" onClick={() => setOpen(true)}>
                  {t("clients.addClient")}
                </Button>
              )}
            </>
          }
        />
      </ErrorBoundary>
    </>
  );
};

export default ClientsFilter;
