export interface IStockLine {
  lineNum: number;
  itemCode: string;
  itemDescription: string;
  quantity: number;
  fromWarehouseCode: string;
  fromWarehouseName: string;
  warehouseCode: string;
  warehouseName: string;
  uoMCode: string;
  uoMName: string;
}

export interface IStock {
  docEntry: number;
  docNum: number;
  cardCode: string | null;
  cardName: string | null;
  docDate: string;
  dueDate: string;
  fromWarehouse: string;
  fromWarehouseName: string;
  toWarehouse: string;
  toWarehouseName: string;
  documentStatus: "O" | "C";
  stockTransferLines: IStockLine[];
}
