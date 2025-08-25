import type { User } from "@/types/user";

export const buildPayments = (values: any, userInfo: User) => {
  const payments: any[] = [];

  if (values.USD) {
    payments.push({
      cashSum: values.USD,
      account: userInfo.u_CashAccount,
      currency: "USD",
    });
  }

  if (values.UZS) {
    payments.push({
      cashSum: values.UZS,
      account: userInfo.u_CashAccountUZS,
      currency: "UZS",
    });
  }

  if (values.card) {
    payments.push({
      cashSum: values.card,
      account: userInfo.u_CardAccount,
      currency: "UZS",
    });
  }

  return payments;
};

export const calcTotalAmount = (
  USD?: number,
  UZS?: number,
  card?: number,
  docRate?: number
) => {
  let totalAmount = 0;
  if (!isNaN(Number(USD)) && !isNaN(Number(docRate))) {
    totalAmount += Number(USD) * Number(docRate);
  }
  if (!isNaN(Number(UZS))) {
    totalAmount += Number(UZS);
  }
  if (!isNaN(Number(card))) {
    totalAmount += Number(card);
  }
  return totalAmount;
};
