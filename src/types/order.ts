export interface IDocumentLines {
  itemCode: string;
  itemDescription: string;
  itemGroup: string;
  quantity: number;
  ugpName: string;
  price: number;
  lineTotal: number;
  whsName: string;
  warehouseCode: string;
  currency: string;
  lineNum: number;
  u_BinCode: string;
  u_BinQuantity: number;
  u_BinAbsEntry: number;
  binLocations: any[];
}

export interface IOrder {
  docEntry: number;
  docNum: number;
  cardCode: string;
  cardName: string;
  cellular: string;
  balance: number;
  docDueDate: string;
  docDate: string;
  slpCode: number;
  slpName: string;
  docCurrency: string;
  docTotal: number;
  comments: string;
  docStatus: string;
  docRate: number;
  paidToDate: null | string;
  paidSum: null | number;
  documentLines: IDocumentLines[];
}
