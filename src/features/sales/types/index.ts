export interface ISalesOrdersFilter {
  cardName: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  slpCode: number | undefined;
  docStatus?: string | undefined;
}

export type SalesFormType = "sales" | "order" | "canceled" | "reports";
