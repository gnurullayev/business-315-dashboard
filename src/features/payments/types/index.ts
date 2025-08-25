export interface IPaymentsFilter {
  startDate: string | undefined;
  endDate: string | undefined;
}

export type PaymentsType = "incoming" | "outgoing";
