export interface IPurchaseFilter {
  cardName: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}

export type PurchasesFormType = "purchasesReceiving" | "purchaseInvoices";
export type PurchasesOrSalesType = "sales" | "purchase";
