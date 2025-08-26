export interface IPaymentInvoice {
  lineNum: number;
  invoiceDocEntry: number;
  invoiceDocNum: number;
  sumApplied: number;
  AppliedFC: number;
}

export interface IVendorPaymentAccount {
  lineId: number;
  acctCode: string;
  acctName: string;
  sumApplied: number;
  AppliedFC: number;
}

export interface IPayment {
  docNum: number;
  docEntry: number;
  docType: string | null;
  cashAcct: string;
  cashAcctName: string;
  cardCode: string;
  cardName: string | null;
  docDate: string;
  cashSum: number;
  docCurr: string;
  comments: string | null;
  docRate: number;
  paymentInvoices: IPaymentInvoice[];
  paymentAccounts: IVendorPaymentAccount[];
}
