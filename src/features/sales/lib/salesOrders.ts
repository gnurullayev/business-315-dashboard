import type { IDocumentLines, IOrder } from "@/types/order";
import dayjs from "dayjs";
import { API } from "@/services/api";
import type { SalesFormType } from "../types";

export const mapSalesOrderPayload = (values: any, salesType: SalesFormType) => {
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

  const isSales = salesType === "sales";

  const buildBinAllocations = (binLocation: any[] = []) => {
    if (!binLocation.length)
      return isSales
        ? []
        : { u_BinCode: null, u_BinQuantity: null, u_BinAbsEntry: null };

    if (isSales) {
      return binLocation.map((bin) => ({
        binAbsEntry: bin.binAbsEntry,
        quantity: bin.onHandQuantity,
      }));
    }

    const { binCode, onHandQuantity, binAbsEntry } = binLocation[0];
    return {
      u_BinCode: binCode,
      u_BinQuantity: onHandQuantity,
      u_BinAbsEntry: binAbsEntry,
    };
  };

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
        unitPrice: item.price ? Number(item.price) : 0,
        quantity: item.quantity ? Number(item.quantity) : 0,
        currency: docCurrency,
        warehouseCode: item.warehouse,
        ...(isSales
          ? {
              baseType: -1,
              baseEntry: null,
              baseLine: null,
              documentLinesBinAllocations: buildBinAllocations(
                item.binLocation
              ),
            }
          : buildBinAllocations(item.binLocation)),
      })) || [],
  };
};

export function mapOrderToFormValues(order: IOrder | null) {
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

export function mapFormValuesToPayload(values: any, order: IOrder) {
  const parsed = dayjs(values.docDueDate, "DD.MM.YYYY");

  return {
    docDueDate: parsed.format("YYYY-MM-DD"),
    documentLines: values.items.map((item: any) => ({
      lineNum: item.lineNum,
      itemCode: item.itemCode,
      unitPrice: item.price,
      quantity: item.quantity,
      currency: order.docCurrency,
    })),
  };
}

export const buildInvoicePayload = (order: IOrder) => ({
  cardCode: order.cardCode,
  docDueDate: dayjs(order.docDueDate, "DD.MM.YYYY").format("YYYY-MM-DD"),
  docDate: dayjs(order.docDate, "DD.MM.YYYY").format("YYYY-MM-DD"),
  docCurrency: order.docCurrency,
  salesPersonCode: order.slpCode,
  comments: order.comments,
  docRate: order.docRate,
  documentLines: order.documentLines.map((item) => ({
    lineNum: item.lineNum,
    itemCode: item.itemCode,
    quantity: item.quantity,
    unitPrice: item.price,
    currency: item.currency,
    warehouseCode: item.warehouseCode,
    baseType: 17,
    baseEntry: order.docEntry,
    baseLine: item.lineNum,
    documentLinesBinAllocations: [
      {
        binAbsEntry: item.u_BinAbsEntry,
        quantity: item.u_BinQuantity,
      },
    ],
  })),
});

export const buildSalesCancelPayload = (order: IOrder) => ({
  cardCode: order?.cardCode,
  docDueDate: order?.docDueDate,
  docDate: order?.docDate,
  docCurrency: order?.docCurrency,
  salesPersonCode: order?.slpCode,
  comments: order?.comments,
  docRate: order?.docRate,
  documentLines: order?.documentLines.map((item) => ({
    lineNum: item.lineNum,
    baseEntry: order.docEntry,
    baseLine: item.lineNum,
    itemCode: item.itemCode,
    quantity: item.quantity,
    unitPrice: item.price,
    currency: item.price,
    warehouseCode: item.warehouseCode,
    documentLinesBinAllocations: item.binLocations.map((bin) => ({
      binAbsEntry: bin.absEntry,
      quantity: bin.quantity,
    })),
  })),
});

export const orderApi = {
  createInvoice: (data: any) => API.postSalesInvoices(data),
  cancelOrder: (id: number) => API.postSalesOrdersCancel(id),
  closeOrder: (id: number) => API.postSalesOrdersClose(id),
  cancelSales: (data: any) => API.postSalesCancel(data),
};
