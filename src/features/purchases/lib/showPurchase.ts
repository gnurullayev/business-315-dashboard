import type { IDocumentLines, IOrder } from "@/types/order";

export function mapPurchaseToFormValues(order: IOrder | null) {
  if (!order) return {};

  const items = order?.documentLines?.length
    ? order.documentLines.map((item: IDocumentLines) => ({
        itemCode: item.itemCode,
        quantity: item.quantity,
        price: item.price,
        data: item,
        lineNum: item.lineNum,
        currency: item.currency,
      }))
    : [];

  return {
    items,
    cardCode: order.cardCode,
    docTotal: `${order.docTotal} ${order.docCurrency}`,
    docDate: order.docDate,
    docDueDate: order.docDueDate,
    paidSum: order?.paidSum,
  };
}
