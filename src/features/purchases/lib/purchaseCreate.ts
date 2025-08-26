import dayjs from "dayjs";

export const mapPurchaseCreatePayload = (values: any) => {
  const {
    cardCode,
    docCurrency,
    date,
    term,
    slpCode,
    comment,
    dollarRate,
    items,
  } = values;

  return {
    cardCode,
    docCurrency,
    docDate: dayjs(date).format("YYYY-MM-DD"),
    docDueDate: dayjs(term).format("YYYY-MM-DD"),
    salesPersonCode: slpCode,
    comments: comment,
    docRate: docCurrency === "USD" ? 1 : dollarRate,
    documentLines:
      items?.map((item: any, idx: number) => ({
        lineNum: idx,
        itemCode: item.itemCodes,
        price: item.price ? Number(item.price) : 0,
        quantity: item.quantity ? Number(item.quantity) : 0,
        currency: docCurrency,
        warehouseCode: item.warehouse,
      })) || [],
  };
};
