export interface IPurchase {
  docEntry: number;
  docNum: number;
  cardCode: string;
  cardName: string;
  cellular: string | null;
  balance: number;
  docDueDate: string;
  docDate: string;
  slpCode: number;
  slpName: string;
  docCurrency: string;
  docTotal: number;
  comments: string | null;
  documentLines: IPurchaseDocumentLine[];
}

export interface IPurchaseDocumentLine {
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
}
