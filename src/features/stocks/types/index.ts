export interface IStockFilter {
  startDate: string | undefined;
  endDate: string | undefined;
}

export type StockType =
  | "stock-products"
  | "incoming-products"
  | "receiving-products"
  | "delivered-products";
