import { useQuery } from "@tanstack/react-query";
import type { IReportsFilter } from "../types";
import { API } from "@/services/api";
import { useMemo } from "react";
import type { IInventoryItem } from "@/types/inventory-items";

export const useGetReports = (filter: IReportsFilter) => {
  const { data, isLoading } = useQuery({
    queryKey: ["reports-list", filter],
    queryFn: async () =>
      await API.getInventoryItems({ ...filter, skip: 0, pageSize: 100000 }),
  });

  const reportsData = useMemo(() => {
    if (data?.data?.length) {
      const defaultWarehouseData = { inStock: 0, ordered: 0, weight: 0 };
      return data.data.map((item: IInventoryItem, idx: number) => {
        const warehouseDefault = item.documentLines.find(
          (docLine) => docLine.warehouseCode === "01"
        );
        const warehouseMain = item.documentLines.find(
          (docLine) => docLine.warehouseCode === "02"
        );
        const rawMaterialWarehouse = item.documentLines.find(
          (docLine) => docLine.warehouseCode === "03"
        );
        return {
          key: idx + 1,
          itemName: item.itemName,
          inStockTotal: item.inStockTotal,
          groupName: item.groupName,
          warehouseDefault: warehouseDefault
            ? warehouseDefault
            : defaultWarehouseData,
          warehouseMain: warehouseMain ? warehouseMain : defaultWarehouseData,
          rawMaterialWarehouse: rawMaterialWarehouse
            ? rawMaterialWarehouse
            : defaultWarehouseData,
        };
      });
    }

    return null;
  }, [data?.data]);

  return {
    reportsData,
    isLoading,
  };
};
