export interface IInventoryItem {
  itemCode: string;
  itemName: string;
  price: number;
  currency: null | number;
  itemType: string;
  groupCode: number;
  groupName: string;
  uoMCode: string;
  uoMName: string;
  inStockTotal: number;
  committedTotal: number;
  orderedTotal: number;
  weightTotal: number;
  documentLines: [
    {
      warehouseCode: string;
      warehouseName: string;
      inStock: number;
      committed: number;
      ordered: number;
      weight: number;
      binLocations: [
        {
          binAbsEntry: number;
          itemCode: string;
          itemName: string;
          binCode: string;
          onHandQuantity: number;
        }
      ];
    }
  ];
}
