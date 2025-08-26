import { FormMode } from "@/enums";
import type { FormModeType } from "@/types";
import type { IStock } from "@/types/stock";

export const mapStockPayload = (values: any, mode: FormModeType) => {
  const { fromWarehouseCode, toWarehouseCode, docDate, dueDate, items } =
    values;

  const stockTransferLines = items.map(
    ({ itemCodes, quantity, uoMCode }: any, idx: number) => ({
      itemCode: itemCodes,
      quantity,
      warehouseCode: toWarehouseCode,
      fromWarehouseCode: fromWarehouseCode,
      lineNum: idx,
      ...(mode === "EDIT" ? { uoMCode } : {}),
    })
  );

  if (mode === FormMode.EDIT) {
    return { stockTransferLines };
  }

  return {
    docDate,
    dueDate,
    toWarehouse: toWarehouseCode,
    fromWarehouse: fromWarehouseCode,
    stockTransferLines,
  };
};

export const mapStockTransferPayload = (showStock: IStock) => {
  const { stockTransferLines, docEntry, toWarehouse, docDate, dueDate } =
    showStock;

  const mapStockTransferLines = stockTransferLines.map(
    ({ quantity, itemCode, warehouseCode, fromWarehouseCode, lineNum }) => ({
      itemCode,
      quantity,
      warehouseCode,
      fromWarehouseCode,
      lineNum,
      baseEntry: docEntry,
      baseLine: lineNum,
    })
  );

  return {
    docDate,
    dueDate,
    toWarehouse,
    stockTransferLines: mapStockTransferLines,
  };
};
