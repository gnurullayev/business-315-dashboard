import { Filter } from "@/components";
import { API } from "@/services/api";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { IReportsFilter } from "../../types";
import { Form } from "antd";

interface IProps {
  setFilter: Dispatch<SetStateAction<IReportsFilter>>;
}

const fields: any = (t: any, params: any) => {
  return [
    {
      type: "select",
      name: "itemName",
      label: t("reports.searchByClientName"),
      placeholder: t("general.choose"),
      params,
      request: API.getItemsData,
      paramKey: "itemName",
      resDataKey: "data",
      valueKey: "itemName",
      labelKey: "itemName",
      showSearch: true,
    },
    {
      type: "select",
      name: "warehouseName",
      label: t("reports.searchByWarehouse"),
      placeholder: t("general.choose"),
      request: API.getWarehouses,
      resDataKey: "data",
      valueKey: "warehouseCode",
      labelKey: "warehouseName",
    },
    {
      type: "select",
      name: "groupCode",
      label: t("reports.searchByGroup"),
      placeholder: t("general.choose"),
      request: API.getItemsGroups,
      resDataKey: "data",
      valueKey: "itmsGrpCod",
      labelKey: "itmsGrpNam",
    },
  ];
};

const ReportsFilter: FC<IProps> = ({ setFilter }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const groupCode = Form.useWatch("groupCode", form);

  const params = {
    pageSize: 100000,
    skip: 0,
    groupCode,
  };

  const handleFilter = (values: Record<string, any>) => {
    if (values)
      setFilter({
        itemName: values.itemName,
        warehouseName: values.warehouseName,
        groupCode: values.groupCode,
      });
  };

  return (
    <Filter fields={fields(t, params)} onFilter={handleFilter} form={form} />
  );
};

export default ReportsFilter;
